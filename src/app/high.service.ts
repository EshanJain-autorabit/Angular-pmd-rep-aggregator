import { Injectable , Inject , PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/components/prism-java';
import 'prismjs/plugins/line-numbers/prism-line-numbers';



declare var Prism: any;
@Injectable({
  providedIn: 'root'
})
export class HighService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  highlightAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
