import type { ReactNode } from "react";
import { s } from "../../styles/style";
import { cn } from "cn";


export  function AppShell({
    header,children,className
}:{
    header?:ReactNode;
    children:ReactNode;
    className?:string
}){
    return(
         <div className={s.shell.page}>
    {
        header && (  
        <div  className={s.shell.headerWrap}>
            <div  className={s.shell.headerInner}>{header}</div>
        </div>
    )}
       <div  className={cn(s.shell.main, className)}>{children}</div>
       </div> 
    ); 
}