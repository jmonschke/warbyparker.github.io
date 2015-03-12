!function($){"use strict";$.fn.paymentInfo=function(a){var e,s,n,t,r,i="paymentInfo";return n=$.map(["change","blur","keyup","keypress","keydown"],function(a){return a+"."+i}).join(" "),t={visa:/^4/,mc:/^5[1-5]/,amex:/^3(4|7)/,disc:/^6011/},s={getCreditCardType:function(a){var e;return $.each(t,function(s,n){return n.test(a)?(e=s,!1):void 0}),e},matchNumbers:function(a){var e=a.data("ccNumber")||a.val(),n=s.getCreditCardType(e);""!==a.val()?""!==n?$("."+r.cardImageClass).addClass(n):$("."+r.cardImageClass).removeClass().addClass(r.cardImageClass):$("."+r.cardImageClass).removeClass().addClass(r.cardImageClass).data("ccNumber",""),"amex"===n?(a.inputmask({mask:"9999 999999 99999",oncomplete:s.creditCardComplete}),$("."+r.cardCvvClass).inputmask({mask:"9999",oncomplete:s.cvvComplete})):(a.inputmask({mask:"9999 9999 9999 9999",oncomplete:s.creditCardComplete}),$("."+r.cardCvvClass).inputmask({mask:"999",oncomplete:s.cvvComplete})),""===a.val()&&$("."+r.fieldsetClass).find("input:gt(0)").val(""),void 0!==n&&($(a).parents("."+r.fieldsetClass).removeClass("invalid shake"),$("."+r.cardInstructionClass).removeClass("invalid"))},creditCardComplete:function(){var a=$("."+r.cardNumberClass),e=a.inputmask("unmaskedvalue"),n=s.getCreditCardType(e);return void 0===n?($(a).parents("."+r.fieldsetClass).addClass("invalid shake"),$("."+r.cardInstructionClass).addClass("invalid"),void s.updateInstruction(r.messageCardNumberError)):(a.bind("saveValues",function(){("amex"===n&&15===e.length||"amex"!==n&&16===e.length)&&a.data("ccNumber",e).val(e.substr(e.length-4,e.length))}),a.addClass("transitioning-out"),setTimeout(function(){a.removeClass("transitioning-out"),Modernizr.touch?a.trigger("saveValues").blur(function(){a.trigger("saveValues")}):a.bind("blur",function(){a.trigger("saveValues")}).blur(),a.addClass("full")},r.animationWait),setTimeout(function(){$("."+r.fieldsetClass).find("input:gt(0)").removeClass("hide")},r.animationWait),$(a).unbind("blur focus click keydown keypress").bind("focus click keydown",function(e){("focus"===e.type||"click"===e.type||e.shiftKey&&9===e.keyCode)&&(s.beginCreditCard($(a)),s.updateInstruction(r.messageEnterCardNumber))}),void((window.navigator.standalone||!Modernizr.touch)&&($("."+r.cardExpirationClass).focus().val($.trim($("."+r.cardExpirationClass).val())),s.updateInstruction(r.messageExpiration))))},expirationComplete:function(){$("."+r.cardImageClass).addClass("cvv2"),$("."+r.cardExpirationClass).addClass("full").unbind("keydown blur").bind("keydown",function(a){8===a.keyCode&&""===$(this).val()&&($(this).removeClass("full"),(window.navigator.standalone||!Modernizr.touch)&&($("."+r.cardNumberClass).focus(),s.updateInstruction(r.messageEnterCardNumber)))}),(window.navigator.standalone||!Modernizr.touch)&&setTimeout(function(){$("."+r.cardCvvClass).focus(),s.updateInstruction(r.messageCVV)},220),s.updateInstruction(r.messageCVV)},cvvComplete:function(){$("."+r.cardImageClass).removeClass("cvv2"),$("."+r.cardCvvClass).addClass("full").unbind("keydown blur").bind("keydown",function(a){(8===a.keyCode||9===a.keyCode)&&(""===$(this).val()&&($(this).removeClass("full"),(window.navigator.standalone||!Modernizr.touch)&&($("."+r.cardExpirationClass).focus(),s.updateInstruction(r.messageExpiration))),$("."+r.cardImageClass).removeClass("cvv2"))}),(window.navigator.standalone||!Modernizr.touch)&&($("."+r.cardZipClass).focus(),s.updateInstruction(r.messageZip))},zipComplete:function(){$("."+r.cardZipClass).addClass("full").unbind("keydown blur").bind("keydown",function(a){8===a.keyCode&&""===$(this).val()&&($(this).removeClass("full"),(window.navigator.standalone||!Modernizr.touch)&&($("."+r.cardCvvClass).focus(),s.updateInstruction(r.messageCVV)))}).inputmask({mask:"99999"}),$("."+r.fieldsetClass).addClass("valid"),$("."+r.cardInstructionClass).addClass("valid"),s.updateInstruction(r.messageSuccess)},beginCreditCard:function(a){$(a).val($(a).data("ccNumber")).addClass("transitioning-in"),setTimeout(function(){a.removeClass("transitioning-in full")},150),$(a).unbind("keypress blur").bind("keypress blur",function(e){if(13===e.keyCode||"blur"===e.type){var n=$(a).inputmask("unmaskedvalue"),t=s.getCreditCardType(n);("amex"===t&&15===n.length||"amex"!==t&&16===n.length)&&s.creditCardComplete()}}).unbind("focus click keydown"),$("."+r.fieldsetClass).find("input:gt(0)").addClass("hide")},updateInstruction:function(a){$(".card-instruction").html(a)}},e={init:function(a){return r=$.extend({},$.fn.paymentInfo.defaults,a),$.extend($.inputmask.defaults,{placeholder:" ",showMaskOnHover:!1,overrideFocus:!0}),this.each(function(){$(this).find("label").addClass("hide").end().find("."+r.cardNumberClass).inputmask({mask:"9999 9999 9999 9999"}).before("<span class='"+r.cardImageClass+"'></span>").end().find("."+r.cardExpirationClass).inputmask({mask:"m/q",clearIncomplete:!0,oncomplete:s.expirationComplete}).addClass("hide").end().find("."+r.cardCvvClass).inputmask({mask:"999"}).addClass("hide").focus(function(){$("."+r.cardImageClass).addClass("cvv2")}).blur(function(){$("."+r.cardImageClass).removeClass("cvv2")}).end().find("."+r.cardZipClass).inputmask({mask:"99999",oncomplete:s.zipComplete}).addClass("hide").end(),r.cardInstruction&&$(this).after("<span class='"+r.cardInstructionClass+"'>"+r.messageEnterCardNumber+"</span>"),s.matchNumbers($(this).find("."+r.cardNumberClass).eq(0))}).unbind("."+i).bind(n,function(){s.matchNumbers($(this).find("."+r.cardNumberClass).eq(0))})},destroy:function(){return this.unbind("."+i)}},e[a]?e[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?$.error("Method does not exist in plugin"):e.init.apply(this,arguments)},$.fn.paymentInfo.defaults={fieldsetClass:"credit-card-group",cardImageClass:"card-image",cardCvvClass:"card-cvv",cardExpirationClass:"card-expiration",cardZipClass:"card-zip",cardNumberClass:"card-number",cardInstruction:!0,cardInstructionClass:"card-instruction",animationWait:600,focusDelay:200,messageEnterCardNumber:"",messageCardNumberError:"Please enter a valid credit card number",messageExpiration:"Please enter your card's expiration month and year",messageExpirationError:"Please enter a valid month and year",messageCVV:"Please enter the three-digit CVV number found on the back of your card",messageCVVAmEx:"Please enter your four-digit CVV number on the front of your card",messageZip:"Please enter your billing zip code",messageSuccess:""}}(jQuery),$(".credit-card-group").paymentInfo();