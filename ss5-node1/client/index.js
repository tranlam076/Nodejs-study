var url = 'http://localhost:3000/api/v1/products';
function fetchProducts() {
	showLoading(true);
	request(url, 'GET', null, function(error, products) {
		if (error) {
			console.log(error);
			alert('Have something wrong!');
		} else {
			console.log(products);
			if (products.length === 0) {
				showLoading(false);
				document.getElementById('tbl-product-body').innerHTML = '<span class="label label-warning">Product list is empty</span>';
			} else {
				document.getElementById('tbl-product-body').innerHTML = '';
				for (const item of products) {
					var tr = document.createElement('tr');
					var successLB = '<span class="label label-success">Available</span>';
					var warningLB = '<span class="label label-warning">Not Available</span>';
					tr.innerHTML = `
					<td>${item.id}</td>
					<td>${item.name}</td>
					<td>${item.price}$</td>
					<td>${item.isAvailable === true ? successLB : warningLB}</td>
					<td>
					<button type="button" class="btn btn-success" onClick="onUpdateProduct(${item.id})">Update</button>
					<button type="button" class="btn btn-danger" onClick="onDeleteProduct(${item.id})">Delete</button>
					</td>
					`;
					document.getElementById('tbl-product-body').append(tr);
				}
				showLoading(false);
			}
		}
	});
}

function onSaveProduct(id = null) {
	var name = document.getElementById('name').value;
	var price = document.getElementById('price').value;
	var status = document.getElementById('status').checked;
	var newProduct = {
		id: null,
		name: name,
		price: parseInt(price),
		isAvailable: status
	};

	if (id !== null) {
		document.getElementById('btn-submit').setAttribute('onclick', 'onSaveProduct()');
		request(url+`/${id}`, 'PUT', newProduct, function(error, data) {
			if (error) {
				console.log(error);
			} else {
				console.log(data);
				document.getElementById('name').value = '';
				document.getElementById('price').value = '';
				document.getElementById('status').checked = false;
				fetchProducts();	
			}	
		});
	} else {
		request(url, 'POST', newProduct, function(error, data) {
			if (error) {
				console.log(error);
				document.getElementById('lb-message').innerHTML = error.responseJSON.error;
				document.getElementById('lb-message').style.display = 'inline';
			} else {
				console.log(data);
				fetchProducts();
			}
		});
	}
	document.getElementById('lb-message').style.display = 'none';
}

function onUpdateProduct(id) {
	request(url+`/${id}`, 'GET', null, function(error, product) {
		if (error) {
			console.log(error);
			document.getElementById('lb-message').innerHTML = error.responseJSON.error;
			document.getElementById('lb-message').style.display = 'inline';
		} else {
			console.log(product);
			document.getElementById('name').value = product.name;
			document.getElementById('price').value = product.price;
			document.getElementById('status').checked = (product.isAvailable === true) ? true : false;
			document.getElementById('btn-submit').setAttribute('onclick', `onSaveProduct(${product.id})`);	
		}
	});
}

function onDeleteProduct(id) {
	var allowDelete = confirm('Are you sure?');
	if (allowDelete) {
		request(url+`/${id}`, 'DELETE', null, function(error, product) {
			if (error) {
				console.log(error);
			} else {
				console.log(product);
				fetchProducts();	
			}
		});
	}
}

function request(url, method, data, callback) {
	$.ajax({
		url: url,
		data: (data !== null) ? JSON.stringify(data) : data,
		contentType: 'application/json; charset=utf-8',
		error: function(error) {
			callback(error);
		},
		success: function(data) {
			callback(null, data);
		},
		type: method
	});
}

function showLoading(isDisplay) {
	if(isDisplay) {
		$('#tbl-container').hide();
		$('.cls-showLoading').show();
	} else {
		$('#tbl-container').show();
		$('.cls-showLoading').hide();
	}
}