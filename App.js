Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
		launch: function() {

			this.add({
				xtype: 'rallycombobox',
				width: 600,
				fieldLabel: 'Select Theme:',
				// Display Template
				displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{FormattedID} - {Name}','</tpl>'),
				// List Template
				tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{FormattedID} - {Name}</div>','</tpl>'),
				storeConfig: {
					autoLoad: true,
					model: 'PortfolioItem/Theme',
					fetch: ['FormattedID','Name'],
					sorters: [
						{
							property: 'Rank',
							direction: 'ASC'
						}
					],
					filters : [
						{ property: 'Parent.FormattedID', operator: '=', value: 'I79' }
					],
					limit: Infinity
				},
				listeners: {
					select: this._onSelect,
					ready: this._onLoad,
					scope: this
				}
			});
		},
            
		_onLoad: function() {
			this.add({
				xtype: 'rallycardboard',
				types: ['User Story'],
				context: this.getContext(),
				storeConfig: {
					filters: [this._getThemeFilter()]
				},
				cardConfig: {
					showIconsAndHighlightBorder: true,
					editable: true,
					// fields: ['Feature'],
					showAge: true
				},
				rowConfig: {
					field: 'Feature'
				}
			});
		},
		
		_onSelect: function() {
			var board = this.down('rallycardboard');
			board.refresh({
				storeConfig: {
					filters: [this._getThemeFilter()]
				}
			});
		},
            
		_getThemeFilter: function() {
			var combo = this.down('rallycombobox');
			return {
				property: 'Feature.Parent',
				operator: '=',
				value: combo.getValue()
			};
		}

	});