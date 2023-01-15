
document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('remove-splash');
  });

// document
//     .querySelectorAll('.navigation ul li a')
//     .forEach(trigger => {
//         trigger.onclick = function(e) {
//             e.preventDefault();
//             let hash = this.getAttribute('href');
//             let target = document.querySelector(hash);
//             let headerOffset = 100;
//             let elementPosition = target.offsetTop;
//             let offsetPosition = elementPosition - headerOffset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: "smooth"
//             });
//         };
//     });

//     document
//     .querySelectorAll('.footer ul li a')
//     .forEach(trigger => {
//         trigger.onclick = function(e) {
//             e.preventDefault();
//             let hash = this.getAttribute('href');
//             let target = document.querySelector(hash);
//             let headerOffset = 100;
//             let elementPosition = target.offsetTop;
//             let offsetPosition = elementPosition - headerOffset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: "smooth"
//             });
//         };
//     });

    const nav = document.querySelector('#navigation');
    const navTop = nav.offsetTop;
    
    function stickyNavigation() {
    
      if (window.scrollY > 130) {
        // nav offsetHeight = height of nav
        document.body.classList.add('fixed-nav');
      } else {
        document.body.classList.remove('fixed-nav');
      }
    }
    
    window.addEventListener('scroll', stickyNavigation);
    

    var menuToggle = document.getElementById('menu-toggle');

    menuToggle.addEventListener("click", (e)=> {
        e.preventDefault;
        document.body.classList.toggle('menu-toggle');
    });

    function validateForm() {
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var email = document.getElementById("email").value;
        var subject = document.getElementById("subject").value;

        if (fname == "" || lname == "" || email == "" || subject == "") {
            alert("Please fill in all fields!");
            return false;
        } else {
          
          alert("Message successfully sent");
        } 

    } 

  