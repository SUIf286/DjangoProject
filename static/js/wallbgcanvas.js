var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

var containerbg;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 1;

var container = document.querySelector(".container");
var signInBtn = document.getElementById("signIn");
var signUpBtn = document.getElementById("signUp");
var fistForm = document.getElementById("form1");
var secondForm = document.getElementById("form2");
var InBtn = document.getElementById("In");
var UpBtn = document.getElementById("Up");


init();
animate();



function init() {
    signInBtn.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });

    signUpBtn.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });

    fistForm.addEventListener("submit", (e) => e.preventDefault());
    secondForm.addEventListener("submit", (e) => e.preventDefault());

    InBtn.addEventListener("click", () => {
        var username = $("input[type='username']").val();
        alert(username)
        var password = $("input[type='password']").val();
        alert(password)
            $.ajax({
                url: "signin",
                method: "get",
                data: {
                    username: username,
                    password: password
                },
                success: function(response) {
                    //alert(response)
                    if (response.success) {
                        alert("登录成功！");
                        location.href = "/test";  // 跳转到登录页面
                    } else {
                        alert("登录失败：" + response.message);
                    }
                }
            });
    });

    UpBtn.addEventListener("click", () => {

            var username = $("input[type='newuser']").val();
            //alert(username)
            var password = $("input[type='pwd']").val();
            var confirmpwd = $("input[type='confirmpwd']").val();

            if (password !== confirmpwd) {
                alert("密码和确认密码不匹配！");
                return;
            }

            $.ajax({
                url: "/register",  // 你的注册接口URL
                method: "get",
                data: {
                    username: username,
                    password: password
                },
                success: function(response) {
                    //alert(response)
                    if (response.success) {
                        alert("注册成功！");
                        location.href = "/login";  // 跳转到登录页面
                    } else {
                        alert("注册失败：" + response.message);
                    }
                }
            });
        
    });

    containerbg = document.createElement( 'div' );
    containerbg.id = 'wall-bg';
    document.body.appendChild( containerbg );
    overlay = document.createElement( 'span' );
    containerbg.appendChild( overlay );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    particles = new Array();

    var PI2 = Math.PI * 2;
    var material = new THREE.ParticleCanvasMaterial( {
        color: '#e6eaea',
        program: function ( context ) {

            context.beginPath();
            context.arc( 0, 0, 1, 0, PI2, true );
            context.fill();

        }

    } );

    var i = 0;

    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i ++ ] = new THREE.Particle( material );
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );

        }

    }

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    containerbg.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    // document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

//

function animate() {

    requestAnimationFrame( animate );

    render();


}

function render() {

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );

    var i = 0;

    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i++ ];
            particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
            particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

        }

    }

    renderer.render( scene, camera );

    count += 0.08;

}





signUpBtn.addEventListener("click", () => {
	containerbg.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());