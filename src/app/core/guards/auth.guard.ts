import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../../facades';


export const authGuard: CanActivateFn = (route, state) => {
  const authfacade=inject(AuthFacade)
 const router=inject(Router)
  
  if(!authfacade.isAuthenticated){
    return router.createUrlTree(['/auth'])
  }
  return authfacade.isAuthenticated;
};
