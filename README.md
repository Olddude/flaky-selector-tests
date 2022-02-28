# Flaky selector tests

## Installation
```npm install```

## Issue
with the current setup ngrx selector test execution is flaky when running npm run test

## Reproduction
after a successful npm install run npm run test approximately x 10 times


Chrome Headless 98.0.4758.109 (Mac OS 10.15.7): Executed 1 of 2 SUCCESS (0 
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7) DoSomethingFoo Selectors select foo should return foo FAILED 
        Error: Expected $.name = 'first' to equal 'second'. 
            at <Jasmine> 
            at UserContext.<anonymous> (src/app/features/do-something/do-something.selectors.spec.ts:19:22) 
            at ZoneDelegate.invoke (node_modules/zone.js/dist/zone.js:400:1) 
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/dist/zone-testing.js:301:43) 
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7): Executed 2 of 2 (1 FAILED) (0 secs / 0.055 secs) 
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7) DoSomethingFoo Selectors select foo should return foo FAILED 
        Error: Expected $.name = 'first' to equal 'second'. 
            at <Jasmine> 
            at UserContext.<anonymous> (src/app/features/do-something/do-something.selectors.spec.ts:19:22) 
            at ZoneDelegate.invoke (node_modules/zone.js/dist/zone.js:400:1) 
            at ProxyZoneSpec.onInvoke (node_modules/zone.js/dist/zone-testi 
Chrome Headless 98.0.4758.109 (Mac OS 10.15.7): Executed 2 of 2 (1 FAILED) (0.072 secs / 0.055 secs) 
TOTAL: 1 FAILED, 1 SUCCESS 
TOTAL: 1 FAILED, 1 SUCCESS 
