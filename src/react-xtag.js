(function(w){
    if (w.xtag === undefined) return;

    w.xtag.registerReact = function(elementName, reactClass){
        var element = {};

        w.xtag.register(elementName,{
            extends: 'div',
            lifecycle: {
                created: function(){
                    element = new reactClass(this.attributes);
                    React.renderComponent(element, this);
                },
                inserted: function(){
                    if (element.componentDidMount)
                        element.componentDidMount();
                },
                removed: function(){
                    if (element.componentWillUnmount)
                        element.componentDidMount();
                },
                attributeChanged: function(a, b, c){

                }
            }
        })
    }
})(window)