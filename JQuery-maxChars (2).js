		/*
		maxChars Plugin
		------------------------------------------------------------------------------------------
		Cria uma barra que mostra quantos caracteres faltam serem digitados numa textarea ou input
		
		Por Walter Staeblein 2012
		*/
		(function($) {
			var settings;

			var ie = (function() {
			    var undef, v = 3, div = document.createElement('div');

			    while (
                    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    div.getElementsByTagName('i')[0]
                );

			    return v > 4 ? v : undef;
			} ());



		
		
			$.fn.extend({
				maxChars: function(options) {
			
					var defaults = {
						color: 'red',						// Cor da barra indicadora
						backcolor: '#EFEFEF',				// Cor de fundo da barra
						height: 7,							// Altura da barra
						border: false,						// Se a barra tem borda (sempre de 1 pixel)
						bordercolor: 'black',				// Cor da borda
						borderstyle: 'solid',				// Estilo da borda (solid, dotted, dashed, etc.)
						maxlength: 100, 					// Número máximo de caracteres que o controle terá. Esta propriedade só é usada se o atributo 
															// maxlength da caixa de texto não for setado
						title: false,						// Se a barra terá um tooltip informando o tamanho
						titlemessage: '# caracteres de ##'	// Conteúdo do tooltip. # = Caracteres digitados, ## total de caracteres 
					}
					settings = $.extend(defaults, options);

					return $(this).each(function(i, ele) { 
						// Pega o comprimento
						var width=$(ele).outerWidth(true); 
						// Pega o número máximo de caracteres
						var maxLen = $(ele).attr('maxlength');
						 
						// Prepara o elemento
						var slider = $('<div></div>').css({ 'width': width, 'height': settings.height, 'background': settings.backcolor });
						
						// aplica a borda se necessário
						if (settings.border == true) {
							if (settings.borderstyle == '') { settings.borderstyle = 'solid'; }
							var brdr = '1px ' + settings.borderstyle + ' ' + settings.bordercolor;
							slider.css('border', brdr).css('width', '-=2');
						}
						
						// Guarda o id do elemento interno (necessário para rodar múltiplas instâncias)
						var innerID = 'ele' + i + '__inner';
						$(ele).data('innerid', innerID);
						
						// Poe o recheio (elemento com a barra móvel)
						var filling = $('<div></div>').attr('id', innerID).css({ 'float': 'left', 'width': '0%', 'height': '100%', 'background': settings.color });
						
						// Title com informativo
						if (settings.title == true) { 
							filling.attr('title', settings.titlemessage.replace('##', maxLen).replace('#', $(ele).val().length));
						}
						slider.append(filling);
						
						// Poe os eventos
						if (ie == true) {
							// IE não suporta MaxLength em TextAreas... :-(
							$(ele).bind('keypress', function(evt) {
								var typedLen = $(ele).val().length;
								if (typedLen >= maxLen) { 
									evt.preventDefault();
								}							
							})
						}
						
						$(ele).bind('keyup cut paste focus blur', function(evt) {
							// Calcula o tamanho da string contida na caixa de texto
							var typedLen = $(this).val().length;
			
							// IE não suporta MaxLength em TextAreas... :-(
							if (typedLen > maxLen && ie == true) { 
								$(ele).val($(ele).val().substring(0, maxLen));
								typedLen = maxLen;
							}	
							// Calcula a porcentagem 
							x = ((100 * typedLen) / maxLen);
							// Não deixa passar de 100%
							if (x > 100) { x = 100; }
							// Seta o comprimento da barra
							id = '#' + $(this).data('innerid');
							$(id).css('width', (x + '%'));
							// Se for o atualiza o tooltip
							if (settings.title == true) { // Title com informativo
								$(id).attr('title', settings.titlemessage.replace('##', maxLen).replace('#', typedLen));
							}
						});
						// Adiciona
						$(ele).after(slider);
						
                        // Atualza
						$(ele).trigger('keyup');

					});
				}
			});
		})(jQuery);