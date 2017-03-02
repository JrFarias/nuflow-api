'use strict'
let banco = require('../../db/MongoConnection');
let q = require('q');
let CompanyModel = require('../model/companyModel');


class CompanyDAO{


    persist(company) {
		var defer = q.defer();
		let con = banco.Connect();
		con.on('error', console.error.bind(console, 'connection error:'));
		con.once('open', function callback() {
		let saveCompany = new CompanyModel({
            name: company.name,
            adress: company.adress,
            phone: company.phone,
            rating: company.rating,
            site: company.site,
            photos: company.photos,
            reviews: company.reviews,
            lat: company.lat, 
            lon: company.lon,
            mapsUrl: company.mapsUrl,
            days: company.days
		});
		saveCompany
			.save()
			.then((result) => {
				banco.Close();
				defer.resolve(result);
			})
			.catch(err => {
				defer.reject(err);
				console.log('Erro: ', err);
			});
		});
		return defer.promise;
	}

    persistAll(company) {
		var defer = q.defer();
			let con = banco.Connect();
			con.on('error', console.error.bind(console, 'connection error:'));
			con.once('open', function callback() {
				for(var i=0; i<company.length; i++){
					let saveCompany = new CompanyModel({
						name: company[i].name,
						adress: company[i].adress,
						phone: company[i].phone,
						rating: company[i].rating,
						site: company[i].site,
						photos: company[i].photos,
						reviews: company[i].reviews,
						lat: company[i].lat, 
						lon: company[i].lon,
						mapsUrl: company[i].mapsUrl,
						days: company[i].days
					});
					saveCompany.save().then(()=>{
						if(i == company.length){
							banco.Close();
						}
					});
				}
			defer.resolve();
			});
			return defer.promise;
	}


    
}

module.exports = new CompanyDAO();