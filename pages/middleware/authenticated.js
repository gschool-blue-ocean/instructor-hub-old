
const authenticated = (handler) => {
      return async (req, res) => {
        //do token/cookie checks here
        console.log("touched the middleware")
        return (req, res);
      }
  };

//   export const config = {
//     matcher: [
//       /*
//        * Match all request paths except for the ones starting with:
//        * - api (API routes)
//        * - static (static files)
//        * - favicon.ico (favicon file)
//        */
//       '/((?!signup|technologies|favicon.ico).*)',
//       '/(!$)'
//     ],
//   };


  export default authenticated;