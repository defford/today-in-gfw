"""Convert Exploits Events Registry.xlsx into static-site event data.

Usage: python scripts/import_events.py /path/to/'Exploits Events Registry.xlsx'
Source is treated as community reported. Dates, corrections, recurring-event flags
and source post links are preserved; ended rows are excluded.
"""
from __future__ import annotations
import json, re, sys
from datetime import datetime, timedelta
from pathlib import Path
from artifact_tool import Blob, SpreadsheetFile

src=Path(sys.argv[1])
out=Path(__file__).resolve().parents[1]/'data'/'events.json'
wb=SpreadsheetFile.import_xlsx(Blob.load(str(src)))
sh=wb.worksheets.get_item('Registry')
raw=sh.get_range('A1:O500').values
keys=[str(x).strip() for x in raw[0]]
origin=datetime(1899,12,30)
weekly={'monday':0,'tuesday':1,'wednesday':2,'thursday':3,'friday':4,'saturday':5,'sunday':6}

def excel_date(value):
    if isinstance(value,(int,float)) and value>40000:
        return (origin+timedelta(days=value)).date().isoformat()
    if isinstance(value,str):
        val=value.strip()
        if re.fullmatch(r'\d{4}-\d{2}-\d{2}',val): return val
    return None

def dates(value):
    if isinstance(value,(int,float)):return ([excel_date(value)] if excel_date(value) else [],None)
    if not isinstance(value,str):return [],None
    v=value.strip()
    if ' to ' in v:
        ends=v.split(' to ')
        if len(ends)==2 and excel_date(ends[0]) and excel_date(ends[1]):
            return [],{'start':ends[0],'end':ends[1]}
    parts=v.split(',')
    if len(parts)>1 and all(excel_date(p.strip()) for p in parts):
        return [p.strip() for p in parts],None
    return ([v] if excel_date(v) else []),None

def normal_time(v):
    if isinstance(v,(float,int)) and 0<=v<1:
        mins=round(v*24*60)
        h,m=divmod(mins,60)
        return f'{h%12 or 12}:{m:02d} {"AM" if h<12 else "PM"}'
    return str(v).strip() if v not in (None,'') else None

def region(venue,name):
    t=f'{venue} {name}'.lower()
    if 'norris arm' in t:return "Norris Arm"
    if 'botwood' in t:return 'Botwood'
    if "bishop's falls" in t or 'bishops falls' in t or 'peterview' in t:return "Bishop's Falls"
    if 'gander' in t:return 'Gander'
    return 'Grand Falls-Windsor'

events=[]
for row in raw[1:]:
    if not row[0]:continue
    r=dict(zip(keys,row))
    if str(r.get('Status','')).strip().lower()!='active':continue
    event_dates,multiday=dates(r.get('Dates (ISO)'))
    recur=str(r.get('Recurring') or '').upper()=='YES'
    weekday=None
    if recur:
        field=str(r.get('Dates (ISO)') or '')
        for w,day in weekly.items():
            if w in field.lower(): weekday=day;break
    if not event_dates and not multiday and weekday is None:continue
    v=str(r.get('Venue') or '').strip()
    price=r.get('Price')
    if isinstance(price,(int,float)):
        price='$'+format(price,'g')
    elif price is not None:
        price=str(price)
    e={
      'id':str(r['Event ID']),'title':str(r['Event Name']).strip(),
      'dates':event_dates,'multiday':multiday,'weekday':weekday,
      'time':normal_time(r.get('Time')),'venue':v,
      'town':region(v,r['Event Name']),'price':price,
      'category':str(r.get('Category') or 'Community'),
      'recurring':recur,'recurrenceDetail':str(r.get('Recurrence Detail') or '').strip() or None,
      'sourceUrl':str(r.get('Source Post') or '').strip() or None,
      'sourceType':str(r.get('Source Type') or '').strip(),
      'lastVerified':excel_date(r.get('Last Verified')),
      'notes':str(r.get('Notes') or '').strip() or None
    }
    if e['id']=='EVT-009':
        e['dateConflict']=True
        # Day conflict is documented; do not publish this recurring listing until resolved.
        continue
    events.append(e)
payload={'asOf':'2026-10-28','provenance':'Exploits Events Registry snapshot (community compiled)','totalActiveDated':len(events),'events':events}
out.write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'wrote {len(events)} event records -> {out}')
