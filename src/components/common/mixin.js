import { getStyle } from '../../config/mUtils'
// import { imgBaseUrl, localapi, proapi } from '../../config/env'

export const loadMore = {
    directives: {//自定义指令: 下拉加
        // const throttle = function (fn, gapTime) {
        //     let _lastTime = null;
        //     return function () {
        //         let _nowTime = + new Date()
        //         if (_nowTime - _lastTime > gapTime || !_lastTime) {
        //             fn();
        //             _lastTime = _nowTime
        //         }
        //     }
        // }
        'load-more': {
            bind: (el,binding) =>{
                addEventListener('scroll', function () {
                    let scrollTop = document.documentElement.scrollTop; //body 卷出去的高度
                    let scrollHeight = document.body.scrollHeight; // 内容高度
                    let num = (scrollTop + window.innerHeight >= scrollHeight - 20)
                    if (scrollTop + window.innerHeight >= scrollHeight - 45) {
                        binding.value()
                    }
                })
            }
        }

    }
};

export const getImgPath = {
    methods: {
        //传递过来的图片地址需要处理后才能正常使用
        getImgPath(path) {
            let suffix;
            if (!path) {
                return '//elm.cangdu.org/img/default.jpg'
            }
            if (path.indexOf('jpeg') !== -1) {
                suffix = '.jpeg'
            } else {
                suffix = '.png'
            }
            let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
            return 'https://fuss10.elemecdn.com' + url
        },
    }

}