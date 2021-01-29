import React from 'react'
import ReactDOM from 'react-dom'
import Particles from 'react-particles-js';

export default class Background extends React.Component{
    render(){
        return(
            <Particles
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#1abc9c",
                      blur: 15,
                      opacity:0,
                      color:'red'
            				}
                  },
                  number: {
                    value: 30,
                    density: {
                      enable: true,
                      value_area: 1000
                    }
                  },
                  color: {
                    value: "#1abc9c"
                  },
                  "shape": {
                    "type": "circle",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    }
                  },
                  "opacity": {
                    "value": 1,
                    "random": true,
                    "anim": {
                      "enable": true,
                      "speed": 1,
                      "opacity_min": 1,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 40,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 150,
                      "size_min": 5,
                      "sync": false
                    }
                  },
                  "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": true,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                    }
                  },
                  
                
          
                },
                interactivity: {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": false,
                      "mode": "repulse"
                    }
                  },
                  "modes": {
                    "grab": {
                      "distance": 100,
                      "line_linked": {
                        "opacity": 1
                      }
                    },
                    "bubble": {
                      "distance": 100,
                      "size": 180,
                      "duration": 2,
                      "opacity": 1,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 150,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                retina_detect:true
            	}}
                style={{
                    width: "100%",
                    height: "100%",
                  }}
              
            />

        )
    }
} 