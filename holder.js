$(window).onload(function () { // HTML要素が全て読み込み終わったら、
    let holder = $("#holder"); // id属性がholderの要素をholderという変数に格納し、
    Holder.run({
        images: holder // 変数holderに格納された要素に対してholder.jsの効果を適用する
    });
})