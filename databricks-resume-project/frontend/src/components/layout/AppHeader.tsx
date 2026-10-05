import { s } from "../../styles/style";
import {Link}  from 'react-router-dom';
import { Radar }  from  "lucide-react";
 

export  function  AppHeader(){
    return <div  className={s.appHeader.row}>
          <Link  to='/' className={s.appHeader.brandLink}>
            <div className={s.appHeader.logo}>
              <Radar className={s.icon.md}/>
            </div>
            <div  className="min-w-0">
                <p className={s.appHeader.brandTitle}>SignalForge</p>
                <p className={s.appHeader.brandSubtitle}>Review intelligence for product teams</p>
            </div>
          </Link>
    </div>
}