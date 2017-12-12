$(document).ready(function(){

	var slideShow = $('#slideShow'),
		ul = slideShow.find('ul'),
		li = ul.find('li'),
		cnt = li.length;

// Como las imágenes están posicionadas de manera absoluta, la última imagen se mostrará en la parte superior.
// Por eso los forzamos en el orden correcto asignando índices z:

	updateZindex();

if($.support.transform){

	// Navegadores modernos con soporte para transformaciones css3

	li.find('img').css('rotate',function(i){
// Girando las imágenes en sentido contrario a las agujas del reloj
	//	return (-90*i) + 'deg';
	});

// Enlace de un evento personalizado. los parámetros de dirección y grados
// se pasan cuando el evento se desencadena más adelante en el código.

	slideShow.bind('rotateContainer',function(e,direction,degrees){

// Zoom en la presentación de diapositivas:

	slideShow.animate({
		width: 510,
		height: 510,
		marginTop: 0,
		marginLeft: 0
	},'fast',function(){

	if(direction == 'next'){

// Mover la imagen superior que contiene Li a
// la parte inferior después de una animación fadeOut

	$('li:first').fadeOut('slow',function(){
		$(this).remove().appendTo(ul).show();
		updateZindex();
		});
	}
	else {

// Mostrando el elemento Li más abajo en la parte superior
// con un fundido en la animación. Tenga en cuenta que somos
// actualizar los índices z.

	var liLast = $('li:last').hide().remove().prependTo(ul);
		updateZindex();
		liLast.fadeIn('slow');
	}

// Rotar el slideShow. css ('rotar') nos da
// rotación actual en radianes. Lo estamos convirtiendo a
// grados para que podamos agregar +90 o -90.

	slideShow.animate({
		rotate:Math.round($.rotate.radToDeg(slideShow.css('rotate'))+degrees) + 'deg'
		},'slow').animate({
			width: 490,
			height: 490,
			marginTop: 10,
			marginLeft: 10
			},'fast');
		});
	});

// Al activar los eventos personalizados a continuación, podemos
// muestra las imágenes anteriores / siguientes en la presentación de diapositivas.

	slideShow.bind('showNext',function(){
		slideShow.trigger('rotateContainer',['next',90]);
	});

	slideShow.bind('showPrevious',function(){
		slideShow.trigger('rotateContainer',['previous',-90]);
		});
	}

	else{
// Fallback para Internet Explorer y navegadores más antiguos

	slideShow.bind('showNext',function(){
		$('li:first').fadeOut('slow',function(){
		$(this).remove().appendTo(ul).show();
		updateZindex();
		});
	});

	slideShow.bind('showPrevious',function(){
		var liLast = $('li:last').hide().remove().prependTo(ul);
		updateZindex();
		liLast.fadeIn('slow');
		});
	}

// Escuchando los clics en las flechas, y
// desencadenando el evento apropiado.

	$('#previousLink').click(function(){
		if(slideShow.is(':animated')){
		return false;
		}

	slideShow.trigger('showPrevious');
	return false;
	});

	$('#nextLink').click(function(){
		if(slideShow.is(':animated')){
			return false;
		}
		slideShow.trigger('showNext');
			return false;
	});

// Esta función actualiza las propiedades del índice z.
	function updateZindex(){

// El método CSS puede tomar una función como su segundo argumento.
// i es el índice basado en cero del elemento.

	ul.find('li').css('z-index',function(i){
		return cnt-i;
		});
	}

});