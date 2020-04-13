var emoji = {
    box: $('div.panel-group'),
    init: function () {
        var list = [], item = [];
        $(yumasterEmoji.emoji).each(function (i) {
            var that = this, id = "list" + i;
            list.push('<li><a href="#' + id + '" data-toggle="tab">' + that.name + "（ " + that.type + " ）" + '</a></li>');

            item.push('<div class="tab-pane" id="' + id + '">')
            item.push('<table class="emoji-cell"><tr>');
            $(this.list).each(function (n) {
                item.push('<td>');
                item.push('<div>' + this + '</div>');
                item.push('<img src="loading.gif" data-src="' + yumasterEmoji.url + yumasterEmoji.relativepath + that.type + "/" + n + that.ext + '" title="' + this + '" alt="' + this + '" />');
                item.push('</td>');
            });
            item.push('</tr></table>');
            item.push('</div >');
        });
        $('#tablist').html(list.join('')).children().first().addClass('active');
        $('#tabitem').html(item.join('')).children().first().addClass('active');
    }
}
emoji.init();
$('#tabitem').click(function (e) {
    var target = e.target || window.event.srcElement;
    $('#tabitem').find('td').each(function () {
        if (this.contains(target)) {
            $('#emojisrc').val($(this).find('img')[0].src);
            return false;
        }
    })
})
$('#tablist').click(function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.nodeName == "A") {
        setTimeout(function () {
            loadimg();
        }, 50);
    }
});
loadimg();
function loadimg() {
    var ti = $('#tabitem').children('.active');
    if (ti.attr('data-load') != 1) {
        ti.find('img').each(function () {
            var that = this;
            var img = new Image();
            img.onload = function () { that.src = img.src; };
            img.onerror = function () { that.src = "loading.gif"; };
            img.src = this.getAttribute('data-src');
        });
        ti.attr('data-load', 1);
    }
}
$('#emojisrc').click(function () {
    this.focus();
    this.select();
});