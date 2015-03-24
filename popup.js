Popup = (function (){
  /* THIS CLASS NEEDS ZEPTO or JQUERY */

  /*
    objArgs:
    windowModalName: layer name to create
    debug: true or false to debug or not
  */

  Popup = function( objArgs ){
    objArgs = objArgs || {};
    this.windowModalname = objArgs.windowModalName || "PopupWindowModal";
    this.debug = objArgs.debug || false;
    this.modalStack = { body:'',close:true };
    this.modalVisible = false;
    this.debug = false;
    this.data = {};
    this.windowModalname = "windowModal";
    this.windowModalClass = "windowModal";
    this.styles = "<style type='text/css'>" +
                  "#windowModalMask { position:absolute; top:0; left:0; z-index:9000; background-color:#000; display:none; font-size: 2em; }" +
                  "#windowModalContainer .windowModal { position:fixed; width:340px; height:auto!important; display:none; z-index:9999; padding:25px 15px 20px 15px ; -moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius:3px;font-family: HelveticaNeueNormal,HelveticaNeue_Light,HelveticaNeue_Light2,xHelvetica,Arial;}" +
                  ".msie #windowModalContainer .windowModal{background-color:#FFF!important}  " +
                  "#windowModalContainer #windowModal { width:540px; height:303px; background:#FFF; }" +
                  "#windowModalContainer .windowModal p, #windowModalContainer .windowModal h4, #windowModalContainer .windowModal h3, #windowModalContainer .windowModal h2{font-family: HelveticaNeueNormal,HelveticaNeue_Light,HelveticaNeue_Light2,xHelvetica,Arial;display:inline;margin:5px 0 0 0;padding:0;width:100%;font-size:1.3em;color:#000;text-align:justify;line-height:1.2em}" +
                  "#windowModalContainer .windowModal p strong{color:#f60;font-weight:normal}" +
                  "#windowModalContainer .windowModal .closeBtn{float:right;display:inline;background-color:#FFF;padding:10px 13px;position:absolute;right:-7px;top:-10px;-moz-border-radius: 40px;-webkit-border-radius: 40px;border-radius:40px;font-size:1.3em;font-weight:bold;border:1px solid #CCC}" +
                  ".msie #windowModalContainer .windowModal .closeBtn{right:0;top:0}" +
                  "#windowModalContainer .windowModal span.titulo, #windowModalContainer .windowModal span.entradilla{float: left;display:inline;margin:0;padding:0;width:100%;font-family: HelveticaNeueNormal,HelveticaNeue_Light,HelveticaNeue_Light2,xHelvetica,Arial}" +
                  "#windowModalContainer .windowModal span.titulo, #windowModalContainer .windowModal h3, #windowModalContainer .windowModal h4{color:#f60;font-size:2.4em;margin-bottom:6px;text-align:left}" +
                  "#windowModalContainer .windowModal h4{font-size:2em}" +
                  "#windowModalContainer .windowModal span.entradilla{color:#000;font-size:1.6em;margin-bottom:10px;line-height:1.2em}" +
                  "#windowModalContainer .windowModal span.entradilla strong{color:#f60;font-weight:normal}" +
                  "#windowModalContainer .windowModal img{float:right;display:inline;margin:15px 0 0 2%;padding:0;width:48%;height:auto}" +
                  "#windowModalContainer .windowModal img.center{float:none;margin:0 auto 10px auto;text-align:center;display:block;width:auto}" +
                  "#windowModalContainer .windowModal ul{float:left;display:inline;margin:15px 0 0 0;padding:0;width:50%}" +
                  "#windowModalContainer .windowModal ul li{font-size:1.3em;line-height:1.2em;margin-top:5px;list-style:none;float:left;display:inline;width:100%;margin-bottom:5px}" +
                  "#windowModalContainer .windowModal ul li i.icon-cuadrado{float:left;display:block;margin:3px 3px 0 0;padding:0;}" +
                  "#windowModalContainer .windowModal #condiciones ul{width:100%}" +
                  "#windowModalContainer .windowModal #condiciones ul li{padding-left:2%;width:98%}" +
                  "#windowModalContainer .windowModal #condiciones p, #windowModalContainer .windowModal #condiciones h4{margin-bottom:5px} " +
                  ".windowModalBar { padding-left:10px; color:#FFF; font-weight:bold; background:#33F; position:relative; top:-20px; left:-20px; }" +
                  ".windowModal .close{background:#CCC; color:#000; width:40px; text-decoration:none; text-align:center; float:right; clear:right; position:relative; top:-20px; left:20px;}" +
                  ".windowModal tr.selected {background: none repeat scroll 0 0 #ff6600; color: #ffffff;}" +
                  ".windowModal tr.selected:hover {background: none repeat scroll 0 0 #ff9933; color: #000000;}" +
                  "#windowModalContainer .container:before{display:none}" +
                  ".windowModal .spinner { text-align: center; margin: 10px auto; width: 60px; height: 60px; animation: rotateSpinnerPopup 1.4s infinite ease-in-out, backgroundSpinnerPopup 1.4s infinite ease-in-out alternate; -webkit-animation: rotateSpinnerPopup 1.4s infinite ease-in-out, backgroundSpinnerPopup 1.4s infinite ease-in-out alternate; }" +
                  "@keyframes rotateSpinnerPopup { 0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); } 50% { transform: perspective(120px) rotateX(-180deg) rotateY(0deg); } 100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); } }" +
                  "@keyframes backgroundSpinnerPopup { 0% { background-color: #F60; } 50% { background-color: #000; } 100% { background-color: #FFF; } }" +
                  "@-webkit-keyframes rotateSpinnerPopup { 0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); } 50% { transform: perspective(120px) rotateX(-180deg) rotateY(0deg); } 100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); } }" +
                  "@-webkit-keyframes backgroundSpinnerPopup { 0% { background-color: #F60; } 50% { background-color: #000; } 100% { background-color: #FFF; } }" +
                  "</style>";
  };

  Popup.prototype.create = function( data ) {
    /* data Params:
        body: html text ( "" by default )
        width, height ( window size * 0.8 by default )
        maxWidth, maxHeight ( window size * 0.8 by default )
        tagHtmlMsg: HTML Tag to show message. By default empty.
        close: true/false
        spinner: true/false
        closePos: up[default], down, both
        wMCClass: css class of Modal Container
        cssclass: css extra class to apply
        parentclass: css class
        XcloseHTML: to change "X" by HTML code in the close button 
        onclose: function callback when popup is closed
        buttons: objects' array with threesome {value,callback,close} to render buttons on the popup bottom
    */ 
    this.data = this.checkDataParams( data );
    var d = this.data;

    var self = this, i,
        closeModalUp = "<div class='closeBtn'><a id='closeBtnModalUp' href='#'>" + ( ( typeof d.XcloseHTML != "undefined" )?d.XcloseHTML:"X" ) + "</a></div>",
        closeModalDown = "<div class='closeBtn'><a id='closeBtnModalDown' href='#'>X</a></div>",
        selfCloseModal = function() { self.closeModal(); };
    var wMClass = ( typeof d.wMClass == "undefined" )?this.windowModalClass:d.wMClass;              

    if ( $( "#"+this.windowModalname+"Container" ).length === 0 ) {
      $( "body" ).append( this.styles + '<div id="'+this.windowModalname+'Container"><div id="'+this.windowModalname+'" class="'+wMClass+' '+ d.cssclass+'"></div><div id="'+this.windowModalname+'Mask"></div></div>' );
    } else {
      $( "#"+this.windowModalname ).attr( "class", wMClass+" "+d.cssclass );
    }
    if ( d.parentclass !== "") { $( "#"+this.windowModalname+"Container" ).addClass( d.parentclass ); 
    } else { $( "#"+this.windowModalname+"Container" ).removeClass(); }

    self.modalVisible = true;
    this.adjustDimensions();
    self.modalStack = this.data;
    if ( d.close === true ) {
      if ( d.closePos == "up" || d.closePos == "both" ) { d.body = closeModalUp + d.body; }
      if ( d.closePos == "down" || d.closePos == "both" ) { d.body = d.body + closeModalDown; }
    }
    if ( d.tagHtmlMsg !== "" ) { data.body = "<"+d.tagHtmlMsg+">" + data.body + "</"+d.tagHtmlMsg+">"; }
    $( "#"+this.windowModalname ).html( data.body );

    if ( d.close === true ) {
      if ( typeof( d.onclose ) == "undefined" ) { d.onclose = function() {}; }
      if ( d.closePos == "up" || d.closePos == "both" ) {
        $( "#closeBtnModalUp" ).on( "click", function() { return self.closeModal(); } );
      }
      if ( d.closePos == "down" || d.closePos == "both" ) {
        $( "#closeBtnModalDown" ).on( "click", function() { return self.closeModal(); } );
      }
      $( "#"+this.windowModalname+"Mask").on( "click", function() { return self.closeModal(); } );
    }
    if ( d.spinner ) {
      var spinner = document.createElement( "div" );
      spinner.className ="spinner";
      $( "#"+this.windowModalname ).append( spinner );
    }

    if ( typeof d.buttons != "undefined" ) {
      $( "#"+this.windowModalname+"ButtonsLayer" ).remove();
      $( "#"+this.windowModalname ).append( "<div id='"+this.windowModalname+"ButtonsLayer'></div>" ); 
      for ( i in d.buttons ) {
        $( "#"+this.windowModalname+"ButtonsLayer" ).append( "<input type='button' id='modalButton_"+i+"' value='"+d.buttons[i].value+"'>" );
        if ( typeof d.buttons[i].close === "undefined" ) { d.buttons[i].close = true; }
        if ( d.buttons[i].close ) {
          $( "#modalButton_"+i ).on( "click", selfCloseModal );
        }
        $( "#modalButton_"+i ).on( "click", d.buttons[i].callback );
      }
    }
    self.showModal( "#FFF" );
  };

  Popup.prototype.showModal = function( background ) {
    if ( typeof background == "undefined" ) { background = "#FFF"; }
    var maskHeight = $( document ).height(),
        maskWidth = $( window ).width(),
        winH = $( window ).height(),
        winW = $( window ).width();

    if ( this.data.width < 1 ) { this.data.width = winW * this.data.width; }
    if ( this.data.height < 1 ) { this.data.height = winH * this.data.height; }
    var dimensions = this.adjustDimensions(),
        wC = dimensions.wC,
        hC = dimensions.hC;

    $( '#'+this.windowModalname+'Mask' ).css( {'width':maskWidth,'height':maskHeight-40} );
    //$( '#'+this.windowModalname+'lMask' ).fadeIn( 500 );
    $( '#'+this.windowModalname+'Mask' ).fadeTo( "slow", 0.4 );
    if ( typeof this.data.childrenId != "undefined" ) { $( "#"+this.data.childrenId ).css( 'width', wC ); $( "#"+this.data.childrenId ).css( 'height', hC ); }
    $( "#"+this.windowModalname ).css( { 'background': background } );
    $( "#"+this.windowModalname ).fadeIn( 500 );
  };

  Popup.prototype.adjustDimensions = function() {
    var self = this,
        winH = $( window ).height(),
        winW = $( window ).width(),
        wC = ( winW<569 )?( winW*0.9 ):this.data.width,
        hC = ( winH<305 )?( winH*0.9 ):this.data.height;
    wC = ( wC > this.data.maxWidth && this.data.width >= this.data.maxWidth )?this.data.maxWidth:wC;
    hC = ( hC > this.data.maxHeight && this.data.height >= this.data.maxHeight )?this.data.maxHeight:hC;
    $( "#"+this.windowModalname ).css( 'width',  wC );
    $( "#"+this.windowModalname ).css( 'height', hC );
    $( "#"+this.windowModalname ).css( 'max-width',  wC );
    $( "#"+this.windowModalname ).css( 'max-height', hC );
    //$( "#"+this.windowModalname ).css( 'overflow-y', 'auto' );
    //$( "#"+this.windowModalname ).css( 'overflow-x', 'hidden' );
    this.log( "wC: " + wC + ", hC: " + hC );
    self.centerModal( wC, hC, winW, winH );
    return { 'wC': wC, 'hC': hC };
  };

  Popup.prototype.centerModal = function( wC, hC, winW, winH ) {
    var topP = winH/2-hC/2,
        leftP = winW/2-wC/2,
        wW = winW/2-wC/2, 
        hW = winH/2-hC/2;
    if ( topP < 80 ) { topP = 80; }
    this.log( "wW: "+ wW + ", hW: " + hW );                        
    $( "#"+this.windowModalname ).css( 'top',  topP );
    $( "#"+this.windowModalname ).css( 'left', leftP );
  };

  Popup.prototype.checkDataParams = function( data ) {
    var wmW = $( window ).width(),
        wmH = $( window ).height();
    if ( typeof data === "undefined" ) { data = { body:'', width: wmW * 0.8, height: wmH * 0.8, maxWidth: wmW * 0.8, maxHeight: wmH * 0.8, close: false, closePos: "up", cssclass: "" }; }
    if ( typeof data.width === "undefined" ) { data.width = wmW * 0.8; }
    if ( typeof data.height === "undefined" ) { data.height = wmH * 0.8; }
    if ( typeof data.maxWidth === "undefined" ) { data.maxWidth = wmW * 0.8; }
    if ( typeof data.maxHeight === "undefined" ) { data.maxHeight =  wmH * 0.8; }
    if ( typeof data.close === "undefined" ) { data.close = true; }
    if ( typeof data.spinner === "undefined" ) { data.spinner = false; }
    if ( typeof data.closePos === "undefined" ) { data.closePos = "up"; }
    if ( typeof data.cssclass === "undefined") { data.cssclass = ""; }
    if ( typeof data.parentclass === "undefined" ) { data.parentclass = ""; }
    if ( typeof data.tagHtmlMsg === "undefined" ) { data.tagHtmlMsg = ""; }
    return data;
  };

  Popup.prototype.closeModal = function() {
    var self = this;
    console.log( "cierro y..." );
    self.hideModal();
    if ( typeof this.data != "undefined" ) { this.data.onclose(); }
    return false;
  };

  Popup.prototype.hideModal = function() {
    var self = this;
    self.modalVisible = false;
    $( "#"+this.windowModalname+"Mask" ).hide();
    console.log( "oculto MASK" );
    $( "#"+this.windowModalname ).fadeOut( 500 );
  };

  Popup.prototype.log = function( msg ) {
    if ( console && this.debug ) { console.log( msg ); }
  };

  return Popup;
})();
