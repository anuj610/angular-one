angular.module('one', [])
        .controller('MainCtrl', function() {
            this.categories = [
                {"id": 0, "name": "Development"},
                {"id": 1, "name": "Design"},
                {"id": 2, "name": "Exercise"},
                {"id": 3, "name": "Humor"}
            ];

            this.bookmarks = [
                {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
                {"id": 1, "title": "Egghead.io", "url": "https://egghead.io", "category": "Development"},
                {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design"},
                {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design"},
                {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise"},
                {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise"},
                {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor"},
                {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor"},
                {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor"}
            ];

            this.currentCategory = null;
            
            this.setCurrentCategory = function(category) {
                this.currentCategory = category;
                this.cancelCreating();
                this.cancelEditing();
            };
            
            this.isCurrentCategory = function(category) {
                return this.currentCategory !== null && this.currentCategory.name === category.name;
            };
            
            /* 
             * maintaining states 
             * */
            this.isCreating = false;
            this.isEditing = false;
            
            this.startCreating = function() {
                this.isCreating = true;
                this.isEditing = false;
                
                this.resetNewBookmark();
            };

            this.cancelCreating = function() {
                this.isCreating = false;
            };

            this.startEditing = function(bookmark) {
                this.isCreating = false;
                this.isEditing = true;

                this.setCurrentBookmark(bookmark);
            };

            this.cancelEditing = function() {
                this.isEditing = false;

                this.setCurrentBookmark(null);
            };

            this.shouldShowCreate = function() {
                return this.currentCategory !== null && this.isEditing === false;
            };

            this.shouldShowEdit = function() {
                return this.isCreating === false && this.isEditing === true;
            };

            this.shouldShowCreateBookmark = function() {
                return !this.isCreating && !this.isEditing;
            };

            /* 
             * CRUD
             * */
            this.currentBookmark = null;

            this.setCurrentBookmark = function(bookmark) {
                this.currentBookmark = angular.copy(bookmark);
            };

            this.isEditingBookmark = function(bookmark) {
                return this.currentBookmark !== null && this.currentBookmark.id === bookmark.id;
            };

            this.editBookmark = function(editedBookmark) {
                for( var i=0;i<this.bookmarks.length;i++ ) {
                    if( this.bookmarks[i].id === editedBookmark.id ) {
                        this.bookmarks[i] = editedBookmark;
                        break;
                    }
                }
                
                this.cancelEditing();
            };

            this.createBookmark = function(bookmark) {
                bookmark.category = this.currentCategory.name;
                bookmark.id = this.bookmarks.length;
                this.bookmarks.push(bookmark);

                this.resetNewBookmark();
            };

            this.resetNewBookmark = function() {
                this.newBookmark = {
                    'title' : '',
                    'url' : ''
                };
            };
            
            this.deleteBookmark = function(bookmarkId) {
                for( var i=0; i<this.bookmarks.length; i++ ) {
                    if( this.bookmarks[i].id == bookmarkId ) {
                        this.bookmarks.splice(i, 1);
                    }
                }
                
                if( this.isEditing === true && this.currentBookmark !== null && this.currentBookmark.id === bookmarkId  ) {
                    this.cancelEditing();
                }
            };
        });
;