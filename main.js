$(function () {
    // htmlメソッド：エレメント内に指定したHTMLを挿入する。
    let $indicator = $('.slideshow-indicator'),
        indicatorHTML = "",
        $container = $('.slideshow'),
        $contents = $container.find('.slide');
    var $slideGroup = $('.slideshow-slides');
    var slideCount = $contents.length, // スライドの点
        duration = 500, // 次のスライドへのアニメーションの所要時間
        interval = 5000, // 自動で次のスライドに移るまでの時間
        timer; // タイマーの入れ物
    var currentIndex = 0;






    /* 変数にHTML要素が入っている場合は変数名の先頭に$をつける人が多い。*/
    $contents.each(function (index) {
        $(this).css({
            left: 100 * index + '%'
        });
        let id = $(this).attr('id'); /* 要素のID属性を取得する。*/
        indicatorHTML += '<a href="#' + id + '">' + (index + 1) + '</a>';
    });
    /* そのコンテンツへのリンクを持つa要素を特定の要素に挿入する。*/
    $indicator.html(indicatorHTML);

    goToSlide = (index) => {
        // slideGroupを移動させる処理
        $slideGroup.animate({
            left: index * -100 + '%'
        }, duration);


        /* 現在表示されているスライドがわかるようにcurrentIndexという変数にindexの値を保存しましょう。
           変数の宣言は適切な位置で行なってください。またはcurrentIndexには最初から0を与えてください。
           currentIndexが0ということは最初のスライドが表示されているということです。slideが2番目であればcurrentIndexは1になります。*/
        currentIndex = index;

        updateNav();
    }
    /* 表示されるslideに合わせてサンプルの下の数字や左右にある矢印を変化させる必要があります。
        この処理は(3)で新たな関数を作って実装します。とりあえず今は下記のように関数を呼び出しておいてください。*/
    var $prev = $('.prev'),
        $next = $('.next');

    function updateNav() {
        /* prevクラスとnextクラスを持つ要素をそれぞれ変数に格納してください。
            以下prevクラス、nextクラスを持つ要素をそれぞれprev、nextと呼称します。*/

        /* (currentIndex === 0)のときはprevにdisabledクラスを付加し、
        　　それ以外のときはdisabledクラスを削除するように記述してください。 */
        if (currentIndex === 0) {
            $prev.addClass("disabled");

        } else {
            $prev.removeClass("disabled");
        }
        /* (currentIndex === slideCount - 1)のときはnextにdisabledクラスを付加し、
        　　それ以外のときはdisabledクラスを削除するように記述してください。
            slideCountにはslideの要素数を格納してください。*/
        if (currentIndex === slideCount - 1) {
            $next.addClass("disabled");
        } else {
            $next.removeClass("disabled");
        }
        $indicator.find('a').removeClass("active").eq(currentIndex).addClass("active");

    }


    /* indicator（slideshow-indicatorクラスを持つ要素）の子孫にあたるa要素は
　　            この関数が呼ばれたとき一旦全てのa要素からactiveクラスを削除した後、
                変数currentIndexとeqメソッドを使用して適切なa要素を選択し、それにactiveクラスを付加してください。*/






    startTimer = () => {
        timer = setInterval(function () {

            let nextIndex = (currentIndex + 1) % slideCount;
            goToSlide(nextIndex);

            // goToslide関数に引数を渡して呼び出してください。 
        }, interval);
    }

    // setIntervalで登録したtimerを解除するための関数
    function stopTimer() {
        clearInterval(timer);
    }
    var $nav = $('.slideshow-nav');

    $nav.on('click', 'a', function (event) {
        //調査範囲.on( イベント名, セレクタ, function)ver1.7〜
        event.preventDefault();
        if ($(this).hasClass('prev')) {
            //$(this)はjQueryオブジェクト。
            //thisの持つ情報はjavascriptで操作できる「DOM要素」です。イベントで設定したfunction内で利用したイベントが発生したDOM要素を指します。
            //$(this)は、メソッドで操作したい時に使用。
            //逆にthisのみの場合はそのままそのプロパティ（idの取得、target属性取得の場合に使用）
            //$('a').each(function() {
            //var l = this.href();
            //})
            console.log(currentIndex)
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex + 1);
        }
    });

    // インジケーターのリンクがクリックされたら該当するスライドを表示
    $indicator.on('click', 'a', function (event) {
        //eventオブジェクトはイベント発生時に実行するfunctionに渡されるobjectオブジェクトで、様々なプロパティやメソッドを持っています。
        event.preventDefault();
        if (!$(this).hasClass('active')) {
            goToSlide($(this).index());
            //引数に設定した要素とマッチした要素のインデックス番号を取得。引数に何も設定していない場合はオブジェクトで指定した要素を「兄弟要素の中で」何番目になるか取得します。
        }
    });

    // マウスが乗ったらタイマーを停止、はずれたら開始
    $container.on({
        mouseenter: stopTimer,
        mouseleave: startTimer
    });
    goToSlide(currentIndex);


    startTimer();




});



$(function () {






    /*初期表示*/
    $('.ChangeElem_Panel').hide();
    $('.ChangeElem_Panel').eq(0).show();
    $('.ChangeElem_Btn').eq(0).addClass('is-active');
    /*クリックイベント*/
    $('.ChangeElem_Btn').each(function () {
        $(this).on('click', function () {
            var index = $('.ChangeElem_Btn').index(this);
            $('.ChangeElem_Btn').removeClass('is-active');
            $(this).addClass('is-active');
            $('.ChangeElem_Panel').hide();
            $('.ChangeElem_Panel').eq(index).show();
        });
    });
});