// hello.init({
//   google: "197695806879-8rtcu8gb9joo2ob3tg28rs2nqf9k8vkm.apps.googleusercontent.com"
// })
//
// hello.on( 'auth.login', function( auth ){
//   hello( auth.network ).api('/me').then( function( response ){
//     console.log('whats going on:', response.displayName );
//     var label = document.createElement( "div" );
//     label.id = "pic_and_greet";
//     label.innerHTML = response.name + ' ' + 'is logged in as an administrator';
//     document.body.appendChild( label )
//   })
// })
//
// hello.on( 'auth.logout', function(){
//   var label = document.getElementById( "pic_and_greet" );
//   if( label != null ) document.body.removeChild( label )
// })
