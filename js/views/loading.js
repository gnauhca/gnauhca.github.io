import View from './view.js';

export default class Loading extends View {
    init() {
        this.$numbers = this.$wrap.find('.numbers');
    }
    getPercentText(percent) {
        let textMap = {
            '0': '零',
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四',
            '5': '五',
            '6': '六',
            '7': '七',
            '8': '八',
            '9': '九',
        };
        let units = ['', '十', '百'];
        let nSplit = percent.toString().split('');
        let textArr = [];

        for (let i =0; i < nSplit.length; i++) {

            textArr.push(textMap[nSplit[i]]);
            if (nSplit[i] != 0)
            textArr.push(units[nSplit.length-i-1]);

        }

        let done = false;

        while(!done) {
            done = true;
            if (textArr.length > 1 && textArr[0] === textMap[1]) {
                textArr.shift();
                done = false;
            } 
            if (textArr.length > 1 && textArr[textArr.length-1] === textMap[0]) {
                done = false;
                textArr.pop();
            } 
        }

        return textArr.join('');
    }
    setPercent(percent) {
        let percentText = this.getPercentText(percent);
        this.$numbers.text(percentText);
    }
}