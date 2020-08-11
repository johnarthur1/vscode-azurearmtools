// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import * as assert from "assert";

export namespace assertEx {
    type keyedObject = { [key: string]: unknown };

    export interface IEqualExOptions {
        /** If true, will only match against the properties in the expected object */
        ignorePropertiesNotInExpected: boolean;
    }

    export function deepEqual<T>(actual: T, expected: T, options: IEqualExOptions): asserts actual is T {
        let partial: Partial<T> = actual;
        if (options.ignorePropertiesNotInExpected) {
            partial = <Partial<T>>deepPartialClone(actual, expected);
        }

        assert.deepStrictEqual(partial, expected);
    }

    /**
     * Creates a deep clone of 'o' that includes only the (deep) properties of 'shape'
     */
    function deepPartialClone(shape: unknown, o: unknown): unknown { //asdf test asdf not needed?
        if (shape instanceof Object) {
            const o2 = <keyedObject>(Array.isArray(o) ? [] : {});

            for (const propName of Object.getOwnPropertyNames(shape)) {
                o2[propName] = deepPartialClone((<keyedObject>o)[propName], (<keyedObject>shape)[propName]);
            }

            return o2;
        } else {
            return o;
        }
    }
}
