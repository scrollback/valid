var Result = function(s) {
	this.status = s ? true : false;
	this.info = "";
};


Result.prototype.or = function(r) {
	var rv = new Result();
	rv.status = this.status || r.status;
	rv.info = this.info + "" + r.info;
	return rv;
};

Result.prototype.and = function(r) {
	var rv = new Result();
	rv.status = this.status && r.status;
	rv.info = this.info + "" + r.info;
	return rv;
};


module.exports = Result;