function main()
{
	var volume = new KVS.LobsterData();
	var screen = new KVS.THREEScreen();

	screen.init( volume, {
		width: window.innerWidth*0.85,
		height: window.innerHeight,
		targetDom: document.getElementById('display'),
		enableAutoResize: false
	});

    
	setup();
	screen.loop();

	function setup()
	{

		var isovalue = 128;
		var color = 128;
		var shading = 0;
		
		var smin = volume.min_value;
		var smax = volume.max_value;
		var bounds = Bounds( volume );
		var surfaces = Isosurfaces( volume, isovalue, color,screen, shading );
		screen.scene.add( surfaces );
		screen.scene.add( bounds );

		document.getElementById('ilabel').innerHTML = "Isovalue: " + Math.round( isovalue );
		document.getElementById('clabel').innerHTML = "Color: " + Math.round( isovalue );
	
		document.getElementById('isovalue').addEventListener('mousemove', function() {
			var value = +document.getElementById('isovalue').value;
			isovalue = KVS.Mix( 0, 255, value );
			document.getElementById('ilabel').innerHTML = "Isovalue: " + Math.round( isovalue );
		});

		document.getElementById('color').addEventListener('mousemove', function() {
			var value = +document.getElementById('color').value;
			color = KVS.Mix( 0, 255, value );
			document.getElementById('clabel').innerHTML = "Color: " + Math.round( color );
		});
//button
		document.getElementById('button').addEventListener('click', function() {
			screen.scene.remove( surfaces );
			
			if(document.getElementById('Lambertian').checked){
			var reflection = 0;
			}
			else if(document.getElementById('PhongR').checked){
			var reflection = 1;
			}
			if(document.getElementById('Gouraud').checked){
				if(reflection == 0){
					shading = 0;
				}
				else{
					shading = 1;
				}
			}
			else if(document.getElementById('PhongS').checked){
				if(reflection == 0){
					shading = 2;
					}
				else{
					shading = 3;
				}
			}
		        var ivalue = +document.getElementById('isovalue').value;
			isovalue = KVS.Mix( 0, 255, ivalue );
			var cvalue = +document.getElementById('color').value;
			color = KVS.Mix( 0, 255, cvalue );
			surfaces = Isosurfaces( volume, parseInt(isovalue), parseInt(color),screen, shading );
			screen.scene.add( surfaces );
			screen.scene.add( bounds );
		});

		document.addEventListener( 'mousemove', function() {
			screen.light.position.copy( screen.camera.position );
		});

		window.addEventListener( 'resize', function() {
			screen.resize( [ window.innerWidth*0.8, window.innerHeight ] );
		});
	}
}


