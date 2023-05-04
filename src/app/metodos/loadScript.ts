export class loadScript {
    
    public loadScript(url: string) {
        const body = document.getElementById("cajascriptPage");
        const script = document.createElement('script');
        script.src = url;
        script.async = false;
        script.defer = true;
        body.append(script);
      }
      
      
}