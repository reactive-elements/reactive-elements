_ReactiveElements has not had a changelog in the past, but this one started as
of version 0.8.0 onwards._

**0.10.0** 25 July 18

* __Breaking Change__: previously, an empty string attribute would be passed through to React as `null`, so `some-prop=""` would give React `props.someProp === null`. In this release this behaviour is gone, and an empty string prop is now passed through to React as an empty string.

**0.9.0** 10 May 18

* Add `ignoreAttributeChanged` option.

**0.8.0** 02 May 18

* First release that we're tracking in the changelog.
