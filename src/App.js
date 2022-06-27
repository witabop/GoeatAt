
// do all of our imports and stuff
import React, { useEffect } from 'react'
import Place from './components/Place'
import './style.css'
// import {conEnd, conSta} from './confetti'


export default function App() {

    // set our states, is loading will handle transitioning from loading screen to normal screen
    // once API has been requested and geolocation has been verified.
    const [isLoading, setIsLoading] = React.useState(true);
    // will set our location data!
    const [locationData, setLocationData] = React.useState({
        name: 'Potbelly',
        maplink: 'https://goo.gl/maps/WbtLdZejqXyk8k4m6',
        photo: 'https://lh5.googleusercontent.com/p/AF1QipMVgkpts6tYntPJCUivvWnq6KSth4ZqboHbwm1R=w426-h240-k-no'
    })

    // For use when 'randomize' button is clicked.
    function reRender() {
        window.location.reload(false);
    }

    

    useEffect(() => {
        // check users current location
        window.navigator.geolocation.getCurrentPosition(pos => {
            // I hate cors~
            let proxy = 'https://thingproxy.freeboard.io/fetch/'

            // not mine <3
            window.mobileCheck = function() {
                let check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
              };
            // request food locations near user using google places api
            fetch(proxy + `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.coords.latitude},${pos.coords.longitude}&opennow=true&radius=6000&types=restaurant&key=AIzaSyCGRaXpiEmx569Hk4hVfhPsBAQyrNThUQc`)
                .then(res => res.json())
                .then(data => {
                    // set base timeout for a cool effect if everything else is instant B)
                    setTimeout(() => {
                        // switch to normal screen
                        setIsLoading(false);
                        let place = data.results[Math.floor(Math.random() * data.results.length)]; // random place from list
                        let useName = place.name.length > 19 ? `${place.name.substring(0 , 14)}...` : place.name; // truncate name if on mobile
                        // update location results
                        setLocationData({
                            name: window.mobileCheck() ? useName : place.name, // run mobile check
                            maplink: `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat}%2C${place.geometry.location.lng}&query_place_id=${place.place_id}`,
                            photo: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${place.photos[0].photo_reference}&sensor=false&maxheight=${300}&maxwidth=${340}&key=AIzaSyCGRaXpiEmx569Hk4hVfhPsBAQyrNThUQc`
                        })
                        window.startConfetti();
                        setTimeout(() => window.stopConfetti(), 4000);
                    }, 2500);
                })
            
        }); 
        
        
    },[])
    // display different screens depending on if loading
    return !isLoading ? (
        <div className="container-loaded">
            
            <h1>Go eat <span className="text-highlight ">at:</span></h1>
            {/*pass loading stuff to Place component */}
           <Place name={locationData.name} reRender={reRender} maplink={locationData.maplink} photo={locationData.photo}/>
           <small >Jameson Brown &copy; 2022 goeat.at All Rights Reserved.</small>
        </div>
    ) : (
        <div className="container">
                <h1>Go eat <span className="text-highlight loading">at</span></h1>
        </div>
    )
}