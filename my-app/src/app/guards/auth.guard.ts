import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { CenterService } from '../services/center.service';
export const authGuard: CanActivateFn = (route, state) => {
  const currentmenu=route.url[0].path;
  const router = inject(Router);
  const service = inject(CenterService);
  if (service.IsLoggedIn()) {
    if (route.url.length > 0) {
      let menu = route.url[0].path;
      if (menu == 'admin' || menu=='history' || menu=='center') {
        if (service.GetUserrole() == 'admin') {
          return true;
        } else {
          router.navigate(['']);
          alert('You dont have access.')
          return false;
        }
      }else{
        return true;
      }
    } else {
      return true;
    }
  }
  else {
    router.navigate(['login']);
    return false;
  }
  
};
