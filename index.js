let http = require('http')
let httpProxy = require('http-proxy')
let proxy = httpProxy.createProxyServer({})

let server = http.createServer(function(req,res){
    console.log('headers:', req.headers);
    console.log('original request:', req.url);
    let url = req.url.split('/')
    console.log('ini url =====>', url);
    
    let service = url[1]
    req.url = '/' + ((url.slice((url.length-2)).join('/')))
    if(url[3] === "byLender" || url[3] === "deposit" || url[3] === "withdraw" || url[3] === "bidding" || url[3] === "sudah-ditebus-dan-transfer" || url[3] === "sudah-ditebus" || url[3] === "approve" ||  url[3] === "dibeli-agen" || url[3] === "diambil" || url[3] === "byAgen" ){
        req.url = '/' + ((url.slice((url.length-3)).join('/')))
    }
    if(url[(url.length-1)].indexOf('?') !== -1){
        console.log('ada query di proxy server');
        console.log(url[url.length-1].slice(0,url[url.length-1].indexOf('?')))
        // req.url = url[url.length-1].slice(0,url[url.length-1].indexOf('?')) + '?' + url[url.length-1].slice(url[url.length-1].indexOf('?'))
        // req.url = url[url.length-1].slice(0,url[url.length-1].indexOf('?')) + url[url.length-1].slice(url[url.length-1].indexOf('?'))        
    }
    // if(service === 'transaction'){
    //     req.url = '/' + ((url.slice((url.length-1)).join('/')))
    // }
    console.log('service name: ', service);
    console.log('destination request: ',req.url);
    switch(service){
        case 'profiles':
            proxy.web(req,res,{target : 'http://127.0.0.1:10001'});
            break;
        case 'authentication':
            proxy.web(req,res,{target:'http://127.0.0.1:10000'});
            break;
        case 'notification':
            proxy.web(req,res,{target : 'http://127.0.0.1:10002'});
            break;
        case 'settings':
            proxy.web(req,res,{target : 'http://127.0.0.1:10003'});
            break;
        case 'transaction':
            proxy.web(req,res,{target:'http://127.0.0.1:10004'});
            break;
        case 'lender':
            proxy.web(req,res,{target:'http://127.0.0.1:10005'});
            break;
        default:
            res.end('service not found');
            break;
    }
})

let port = process.env.PORT || 13000
server.listen(port, ()=>{
   console.log('gateway listen on port : ', port);
    
})