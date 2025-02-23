
// import { formatCpp } from "./cpp/cpp.js";
// import { formatJava } from "./java/java.js";
// import { formatPy } from "./python/py.js";
// import { formatC } from "./c/c.js";
// import { formatCs } from "./csharp/cs.js";
// import { formatJs } from "./javascript/js.js";
// import { formatTs } from "./typescript/ts.js";
// import { formatPhp } from "./php/php.js";
// import { formatSwift } from "./swift/swift.js";
// import { formatKt } from "./kotlin/kt.js";
// import { formatGo } from "./golang/go.js";
// import { formatRb } from "./ruby/rb.js";
// import { formatScala } from "./scala/scala.js";
// import { formatRs } from "./rust/rs.js";
// import { formatRkt } from "./rocket/rkt.js";
// import { formatErl } from "./erlang/er.js";
// import { formatEx } from "./elixir/ex.js";

export class Testcases {
	constructor(
		testcases,
		metadata,
		fileformat
	) {
		this.testcases   =  testcases;
		this.metadata    =  metadata;
		this.fileformat  =  fileformat;

		console.log(
			this.testcases,
			this.datatypes,
			this.fileformat
		);

		// return this.format();
	}

	format() {
		let result;
		// switch (this.fileformat) {
		// case "cpp":
		// 	result = formatCpp(this.testcases, this.metadata);
		// 	break;
		//
		// case "java":
		// 	result = formatJava(this.testcases, this.metadata); 
		// 	break;
		//
		// case "py":
		// 	result = formatPy(this.testcases, this.metadata); 
		// 	break;
		//
		// case "c": 
		// 	result = formatC(this.testcases, this.metadata); 
		// 	break;
		//
		// case "cs":
		// 	result = formatCs(this.testcases, this.metadata); 
		// 	break;
		//
		// case "js":
		// 	result = formatJs(this.testcases, this.metadata); 
		// 	break;
		//
		// case "ts":
		// 	result = formatTs(this.testcases, this.metadata); 
		// 	break;
		//
		// case "php":
		// 	result = formatPhp(this.testcases, this.metadata); 
		// 	break;
		//
		// case "swift":
		// 	result = formatSwift(this.testcases, this.metadata); 
		// 	break;
		//
		// case "kt":
		// 	result = formatKt(this.testcases, this.metadata); 
		// 	break;
		//
		// case "go":
		// 	result = formatGo(this.testcases, this.metadata); 
		// 	break;
		//
		// case "rb":
		// 	result = formatRb(this.testcases, this.metadata); 
		// 	break;
		//
		// case "scala":
		// 	result = formatScala(this.testcases, this.metadata); 
		// 	break;
		//
		// case "rs":
		// 	result = formatRs(this.testcases, this.metadata); 
		// 	break;
		//
		// case "rkt":
		// 	result = formatRkt(this.testcases, this.metadata); 
		// 	break;
		//
		// case "erl":
		// 	result = formatErl(this.testcases, this.metadata); 
		// 	break;
		//
		// case "ex":
		// 	result = formatEx(this.testcases, this.metadata); 
		// 	break;
		//
		// default:
		// 	break;

		// }

		// return result;
	}
}

