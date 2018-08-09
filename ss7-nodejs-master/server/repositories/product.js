'use strict';
import BaseRepository from '../repositories/base';
import {Product} from '../models/index.js';

export default class ProductRepository extends BaseRepository {

	constructor() {
		super(Product);
	}

}
