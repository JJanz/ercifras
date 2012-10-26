//<![CDATA[    
// CDATA tag allows the page to XHTML-validate for strict compliance, according to http://docs.jquery.com/Tutorials:jQuery_For_Designers
(function( $ ){

  var methods = {
    init : function( options ) {
        var REchordsLine = /^((?:.*[)\]:])?[ \t\-(]*)(?:(?:([A-G](?:[#bm\-M°º+]|dim|aum|aug)*(?:(?:[(#b]|maj)*[0-9]{1,2}(?:[m\-M°º+)]|dim|aum|aug)*){0,3})(\(?[/\\](?:[A-G](?:[#bm\-M°º+]|dim|aum|aug)*)|(?:[(#b]|maj)*[0-9]{1,2}(?:[m\-M°º+)]|dim|aum|aug)*)?)([ \t\-)]*(?:[[(].+[)\]:])*[ \t\-)]*)*)+([\r\n]|$)/g;
        //TODO: MARK.chordsLine for lines and A for each chord
        // maybe ^(?=currentLineRegex)([\r\n]|$) -- ?=lookforward/lookahead -- let's see what this does
        // maybe string split with regex plus join('</a><a>') -- or see http://www.w3schools.com/jsref/jsref_regexp_lastindex.asp
        this.html(
            this.html().replace(REchordsLine, function(){
                return '<mark class="chordsLine">'+match.replace(p1, '<a>' + p1 + '</a>')+'</mark>';
            })
        );
        var REchordsLyricsWordSepar = /(?!^\w)[ \t]*[–-]+[ \t]*(?!^\w)/gm;
        this.html(this.html().replace(REchordsLyricsWordSepar, "<span class=\"chordsLyricsWordSepar\">$&</span>"));
        //TODO: create buttons/links to transpose (eg. this.chords('transpose', -1)) and optionally toggle Chords (eg. this.chords('toggleChords'))
        return this;
    },
    transpose : function( delta ) {
        var REchordsNames = /[A-G][#b]?(?!([A-LN-Za-ln-z:]))/gm;
        var allChordsInSong = [];
        allChordsInSong = this.children('mark.chordsLine').each( function(){
            return allChordsInSong.concat(this.text().match(REchordsNames));
        }).join('');
        var notes = ( allChordsInSong.indexOf('b') >= 0 ? ['A','Bb','B','C','Db','D','Eb','E','F','Gb','G','Ab'] : ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'] );
        return this.children('mark.chordsLine').each(function(){
            return this.html(
                this.html().replace(REchordsNames, 
                                    function(){
                                        return notes[(12+((notes.indexOf(match)+delta)%12))%12];
                                    })
            );
        });
    },
    toggleChords : function( ) {
        this.toggleClass('chordsOffJustLyrics');
        this.children('mark.chordsLine').toggle();
        this.children('span.chordsLyricsWordSepar').toggle();
        this.css('white-space', (this.hasClass('chordsOffJustLyrics') ? 'pre-line' : 'pre'));
        return this;
    }
  };

  $.fn.chords = function( method ) {

    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.chords' );
    }    

  };

})( jQuery );

//$('pre.chordsLyrics').chords();

// End CDATA tag
//]]
