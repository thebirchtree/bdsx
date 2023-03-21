"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = require("../../source-map-support");
(0, source_map_support_1.install)();
const path = require("path");
const assembler_1 = require("../../assembler");
require("../../codealloc");
const core_1 = require("../../core");
const fsutil_1 = require("../../fsutil");
const tester_1 = require("../../tester");
tester_1.Tester.test({
    async asmtest() {
        const filepath = path.join(__dirname, "asmtest.asm");
        const code = (0, assembler_1.asm)().compile(await fsutil_1.fsutil.readFile(filepath), null, filepath);
        const codebuf = code.allocs();
        this.assert(codebuf.retvalue != null, "retvalue not found");
        this.assert(codebuf.retvalue2 != null, "retvalue not found");
        codebuf.retvalue.setPointer(core_1.chakraUtil.asJsValueRef(123));
        codebuf.retvalue2.setPointer(core_1.chakraUtil.asJsValueRef(456));
        codebuf.testfn2.setPointer(codebuf.testfn);
        const testfn = core_1.chakraUtil.JsCreateFunction(codebuf.test, null);
        const result = testfn();
        this.assert(result === 123, "unexpected result");
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFzbXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRUFBbUQ7QUFDbkQsSUFBQSw0QkFBTyxHQUFFLENBQUM7QUFFViw2QkFBNkI7QUFDN0IsK0NBQXNDO0FBQ3RDLDJCQUF5QjtBQUN6QixxQ0FBd0M7QUFDeEMseUNBQXNDO0FBQ3RDLHlDQUFzQztBQUV0QyxlQUFNLENBQUMsSUFBSSxDQUFDO0lBQ1IsS0FBSyxDQUFDLE9BQU87UUFDVCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRCxNQUFNLElBQUksR0FBRyxJQUFBLGVBQUcsR0FBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLGVBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQzdELE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGlCQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsaUJBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0MsTUFBTSxNQUFNLEdBQUcsaUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9ELE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDSixDQUFDLENBQUMifQ==