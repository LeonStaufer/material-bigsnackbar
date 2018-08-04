/**
   * Class constructor for BigSnackbar MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
var MaterialBigSnackbar = function MaterialBgSnackbar(element) {
    this.element_ = element;
    this.textElement_ = this.element_.querySelector('.' + this.cssClasses_.MESSAGE);
    this.actionElement_ = this.element_.querySelector('.' + this.cssClasses_.ACTION);
    if (!this.textElement_) {
        throw new Error('There must be a message element for a bigsnackbar.');
    }
    if (!this.actionElement_) {
        throw new Error('There must be an action element for a bigsnackbar.');
    }
    this.active = false;
    this.actionHandler_ = undefined;
    this.message_ = undefined;
    this.actionText_ = undefined;
    this.queuedNotifications_ = [];
    this.setActionHidden_(true);
};
window['MaterialBigSnackbar'] = MaterialBigSnackbar;
/**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {string | number}
   * @private
   */
MaterialBigSnackbar.prototype.Constant_ = {
    // The duration of the bigsnackbar show/hide animation, in ms.
    ANIMATION_LENGTH: 250
};
/**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
MaterialBigSnackbar.prototype.cssClasses_ = {
    SNACKBAR: 'mdl-bigsnackbar',
    MESSAGE: 'mdl-bigsnackbar__text',
    ACTION: 'mdl-bigsnackbar__action',
    ACTIVE: 'mdl-bigsnackbar--active'
};
/**
   * Display the bigsnackbar.
   *
   * @private
   */
MaterialBigSnackbar.prototype.displayBigSnackbar_ = function () {
    this.element_.setAttribute('aria-hidden', 'true');
    if (this.actionHandler_) {
        this.actionElement_.textContent = this.actionText_;
        this.actionElement_.addEventListener('click', this.actionHandler_);
        this.setActionHidden_(false);
    }
    this.textElement_.textContent = this.message_;
    this.element_.classList.add(this.cssClasses_.ACTIVE);
    this.element_.setAttribute('aria-hidden', 'false');
    setTimeout(this.cleanup_.bind(this), this.timeout_);
};
/**
   * Show the big snackbar.
   *
   * @param {Object} data The data for the notification.
   * @public
   */
MaterialBigSnackbar.prototype.showBigSnackbar = function (data) {
    if (data === undefined) {
        throw new Error('Please provide a data object with at least a message to display.');
    }
    if (data['message'] === undefined) {
        throw new Error('Please provide a message to be displayed.');
    }
    if (data['actionHandler'] && !data['actionText']) {
        throw new Error('Please provide action text with the handler.');
    }
    if (this.active) {
        this.queuedNotifications_.push(data);
    } else {
        this.active = true;
        this.message_ = data['message'];
        if (data['timeout']) {
            this.timeout_ = data['timeout'];
        } else {
            this.timeout_ = 2750;
        }
        if (data['actionHandler']) {
            this.actionHandler_ = data['actionHandler'];
        }
        if (data['actionText']) {
            this.actionText_ = data['actionText'];
        }
        this.displayBigSnackbar_();
    }
};
MaterialBigSnackbar.prototype['showBigSnackbar'] = MaterialBigSnackbar.prototype.showBigSnackbar;
/**
   * Check if the queue has items within it.
   * If it does, display the next entry.
   *
   * @private
   */
MaterialBigSnackbar.prototype.checkQueue_ = function () {
    if (this.queuedNotifications_.length > 0) {
        this.showBigSnackbar(this.queuedNotifications_.shift());
    }
};
/**
   * Cleanup the bigsnackbar event listeners and accessiblity attributes.
   *
   * @private
   */
MaterialBigSnackbar.prototype.cleanup_ = function () {
    this.element_.classList.remove(this.cssClasses_.ACTIVE);
    setTimeout(function () {
        this.element_.setAttribute('aria-hidden', 'true');
        this.textElement_.textContent = '';
        if (!Boolean(this.actionElement_.getAttribute('aria-hidden'))) {
            this.setActionHidden_(true);
            this.actionElement_.textContent = '';
            this.actionElement_.removeEventListener('click', this.actionHandler_);
        }
        this.actionHandler_ = undefined;
        this.message_ = undefined;
        this.actionText_ = undefined;
        this.active = false;
        this.checkQueue_();
    }.bind(this), this.Constant_.ANIMATION_LENGTH);
};
/**
   * Set the action handler hidden state.
   *
   * @param {boolean} value
   * @private
   */
MaterialBigSnackbar.prototype.setActionHidden_ = function (value) {
    if (value) {
        this.actionElement_.setAttribute('aria-hidden', 'true');
    } else {
        this.actionElement_.removeAttribute('aria-hidden');
    }
};
// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
    constructor: MaterialBigSnackbar,
    classAsString: 'MaterialBigSnackbar',
    cssClass: 'mdl-js-bigsnackbar',
    widget: true
});
