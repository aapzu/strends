
describe('DashboardItemCollection', function(){
    var collection

    beforeEach(function(){
        collection = new Strends.Collections.DashboardItemCollection()
    })

    it('should not be possible to add to items with same words', function(done){
        collection.add(new Strends.Models.DashboardItem({word: "test"}))
        assert.equal(collection.models.length, 1)
        try {
            collection.add(new Strends.Models.DashboardItem({word: "test"}))
        } catch (e) {
            assert.equal(collection.models.length, 1)
            done()
        }
    })

    it('should remove items from the beginning of the list if more than 9 items are added', function(){
        _.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(i){
            collection.add(new Strends.Models.DashboardItem({word: "test"+i}))
        })
        assert.equal(collection.models.length, 9)
        assert.equal(collection.models[0].get("word"), "test2")
        collection.add(new Strends.Models.DashboardItem({word: "test11"}))
        assert.equal(collection.models.length, 9)
        assert.equal(collection.models[0].get("word"), "test3")
    })
})