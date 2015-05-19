		/*
		maxChars Plugin
		------------------------------------------------------------------------------------------
		Cria uma barra que mostra quantos caracteres faltam serem digitados numa textarea ou input
		
		Por Walter Staeblein 2012
		*/
		(function($) {
			var settings;
		
			$.fn.extend({
				maxChars: function(options) {
			
					var defaults = {
						color: 'red',						// Cor da barra indicadora
						backcolor: '#EFEFEF',				// Cor de fundo da barra
						height: 7,							// Altura da barra
						border: false,						// Se a barra tem borda (sempre de 1 pixel)
						bordercolor: 'black',				// Cor da borda
						maxlength: 100, 					// Número máximo de caracteres que o controle terá. Esta propriedade só é usada se o atributo maxlength não for setado
						title: false,						// Se a barra terá um tooltip informando o tamanho
						titlemessage: '# caracteres de ##'	// Conteúdo do tooltip. # = Caracteres digitados, ## total de caracteres 
					}
					settings = $.extend(defaults, options);
				
					return this.each(function(i, ele) {
						// Pega o comprimento
						width=$(ele).outerWidth(); 
						// Pega o número máximo de caracteres
						maxLen = $(ele).attr('maxlength');
						if (maxLen == NaN) { maxLen = settings.maxlength; }
						
						// Prepara o elemento
						slider=$('<div></div>').css({ 'width': width, 'height': settings.height, 'background': settings.backcolor });
						// aplica a borda se necessário
						if (settings.border == true) {
							brdr = '1px solid ' + settings.bordercolor;
							slider.css('border', brdr).css('width', '-=2');
						}
						
						// Guarda o id do elemento interno (necessário para rodar múltiplas instâncias)
						innerID = 'ele' + i + '__inner';
						$(ele).data('innerid', innerID);
						
						// Poe o recheio (elemento com a barra móvel)
						filling = $('<div></div>').attr('id', innerID).css({ 'float': 'left', 'width': '0%', 'height': '100%', 'background': settings.color });
						if (settings.title == true) { // Title com informativo
							filling.attr('title', settings.titlemessage.replace('##', maxLen).replace('#', '0'));
						}
						slider.append(filling);
						
						// Poe os eventos
						$(ele).bind('keyup cut paste focus blur', function() {
							typedLen = $(this).val().length;
							x = ((100 * typedLen) / maxLen) + '%';
							id = '#' + $(this).data('innerid');
							$(id).css('width', x);
							if (settings.title == true) { // Title com informativo
								$(id).attr('title', settings.titlemessage.replace('##', maxLen).replace('#', typedLen));
							}
						});
						// Adiciona
						$(ele).after(slider);
					});
				}
			});
		})(jQuery);