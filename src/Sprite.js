const Helper = require('./Helper')

function getUnit(target) {
    return target instanceof Sprite ? target : target.unit
}

/**
 * export sprite
 * @hideconstructor
 */

class Sprite {
    constructor(sprite) {
        this._sprite = sprite
        this._container = sprite.base.container

        /**
         * self的實體化對象
         */

        this.$self = null
    }

    /**
     * views的簡寫
     */

    get $v() {
        return this._sprite.views
    }

    /**
     * views對象
     */

    get $views() {
        return this._sprite.views
    }

    /**
     * 是否宣告過out且沒有dead and reborn
     */

    get $live() {
        return this._sprite.status.live
    }

    /**
     * utils的接口
     */

    get $utils() {
        return this._container.options.utils
    }

    /**
     * 來自container configs物件
     */

    get $configs() {
        return this._container.getConfigs()
    }

    /**
     * Helper的接口
     */

    get $helper() {
        return Helper
    }

    /**
     * 獲取目前狀態
     */

    get $distName() {
        return this._sprite.dist.name
    }

    /**
     * 是否宣告完born
     */

    get $ready() {
        return this._sprite.status.ready
    }

    /**
     * 是否錯誤，有回傳錯誤訊息
     */

    get $error() {
        return this._sprite.getErrorMessage()
    }

    /**
     * 如果該精靈是參考對象，則獲取參考對象的對象
     */

    get $parent() {
        return this._sprite.parent
    }

    /**
     * 獲取methods的接口
     */

    get $fn() {
        return this._sprite.functions
    }

    /**
     * 監聽一個事件
     * @param {string} channelName 事件名稱
     * @param {object} callback 觸發事件
     */

    $on(channelName, callback) {
        return this._sprite.event.on(channelName, callback)
    }

    /**
     * 監聽一個事件，但只觸發一次
     * @param {string} channelName 事件名稱
     * @param {object} callback 觸發事件
     */

    $onOnce(channelName, callback) {
        return this._sprite.event.once(channelName, callback)
    }

    /**
     * 移除一個事件
     * @param {string} channelName 事件名稱
     * @param {string} id 事件id
     */

    $off(channelName, id) {
        return this._sprite.event.off(channelName, id)
    }

    /**
     * 發送一個事件
     * @param {string} channelName 事件名稱
     * @param {object} params 傳遞參數
     */

    $emit(channelName, ...params) {
        return this._sprite.event.emit(this, channelName, params)
    }

    /**
     * 更新對應key的body
     * @param {object} data
     */

    $put(data) {
        return getUnit(this._sprite.put(data))
    }

    /**
     * 獲取原始資料
     * @param {object} assign 使用deepObjectAssign取代原始資料值
     * @returns {*}
     */

    $raw(assign) {
        return this._sprite.getRawdata(assign)
    }

    /**
     * 獲取語系資源
     * @param {string} name 語系的對應key
     * @param {object} [value] 動態參數
     * @returns {string}
     */

    $meg(name, value) {
        return this._container.getMessage(name, value)
    }

    /**
     * 複製一份sprite並休眠宣告對象
     * @returns {outSprite}
     */

    $out() {
        return getUnit(this._sprite.out())
    }

    /**
     * 關閉這個sprite並喚醒宣告此sprite的對象(無對象的sprite無法宣告)
     * @returns {originSprite}
     */

    $dead() {
        return getUnit(this._sprite.dead())
    }

    /**
     * 初始化並賦予值，並將ready宣告成true
     * @returns {this}
     */

    $born(data) {
        return getUnit(this._sprite.born(data))
    }

    /**
     * 複製當前sprite
     * @returns {sprite}
     */

    $copy() {
        return getUnit(this._sprite.copy())
    }

    /**
     * 綁定一個method
     * @returns {function}
     */

    $bind(name) {
        return this._sprite.bind(name)
    }

    /**
     * 獲取body的所有值(為複製對象)
     * @returns {object}
     */

    $body() {
        return this._sprite.getBody()
    }

    /**
     * 獲取body與refs的鍵值
     * @returns {array.<string>}
     */

    $keys() {
        return this._sprite.getKeys()
    }

    /**
     * 把值切回born賦予的狀態
     * @param {string} [key] 是否針對某個屬性重設
     */

    $reset(key) {
        return this._sprite.reset(key)
    }

    /**
     * 獲取指定屬性的規則集
     * @param {string} name 指定屬性
     * @param {array.<string|fn>} [extra] 擴充規則
     * @returns {array.<fn>}
     */

    $rules(name, extra = []) {
        return this._sprite.getRules(name, extra)
    }

    /**
     * 回傳一個含某些oobe屬性的物件，可用於調適
     * @returns {object}
     */

    $toObject() {
        return this._sprite.toObject()
    }

    /**
     * 把out sprite的資料回歸至origin sprite
     * @returns {originSprite}
     */

    $revive() {
        return getUnit(this._sprite.revive())
    }

    /**
     * 輸出當前狀態指定的export
     * @param {string} [name] 指定狀態
     * @returns {object}
     */

    $export(name, ...args) {
        return this._sprite.export(name, args)
    }

    /**
     * 當前狀態的屬性是否有fixed屬性
     * @param {string} name 指定屬性名稱
     * @returns {boolean}
     */

    $isFixed(name) {
        return this._sprite.dist.isFixed(name)
    }

    /**
     * 當前狀態的屬性是否有hidden屬性
     * @param {string} name 指定屬性名稱
     * @returns {boolean}
     */

    $isHidden(name) {
        return this._sprite.dist.isHidden(name)
    }

    /**
     * 當前狀態的屬性是否沒hidden屬性
     * @param {string} name 指定屬性名稱
     * @returns {boolean}
     */

    $show(name) {
        return !this._sprite.dist.isHidden(name)
    }

    /**
     * 執行origin參數並回傳結果
     * @returns {object}
     */

    $toOrigin() {
        return this._sprite.toOrigin()
    }

    /**
     * 狀態是否與born時的狀態相異
     * @param {string} [key] 是否針對某個屬性作判別
     * @returns {boolean}
     */

    $isChange(key) {
        return this._sprite.isChange(key)
    }

    /**
     * 驗證當下參數是否符合驗證規則
     * @returns {object}
     */

    $validate() {
        return this._sprite.validateAll(this)
    }

    /**
     * 轉換狀態
     * @param {string} name 指定狀態名稱
     * @returns {this}
     */

    $distortion(name) {
        return getUnit(this._sprite.distortion(name))
    }

    /**
     * 轉換狀態，$distortion的縮寫
     * @param {string} name 指定狀態名稱
     * @returns {this}
     */

    $dist(name) {
        return this.$distortion(name)
    }

    /**
     * 將sprite設定為錯誤
     * @param {*} data 錯誤資料
     */

    $setError(data) {
        return this._sprite.setError(data)
    }
}

module.exports = Sprite
