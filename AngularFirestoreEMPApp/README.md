1. Add firebase CLI and ngx-toastr
```bash
npm i --s firebase angularfire2
npm i --s ngx-toastr
```
2. Add firebase configuration
```json
export const environment = {
  production: false,
  firebase:{
    apiKey: "key",
    authDomain: "EMPApp-61109.firebaseapp.com",
    databaseURL: "https://EMPApp-61109.firebaseio.com",
    projectId: "EMPApp-61109",
    storageBucket: "EMPApp-61109.appspot.com",
    messagingSenderId: "8078188752",
    appId: "1:8078188752:web:f68a158b1c52041ffa3ed5",
    measurementId: "G-P7BELP4K04"
  }
};
```
3. add dependency in app.module.ts
```typescript
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

@NgModule({
    imports:[
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ]
})
export class AppModule{}
```

4. Add CSS/JS
use `cdn font awesome` to search css
```html

```