# TypesForBukkit
A Typescript module to help me autcomplete the Bukkit API for the [PlaceholderAPI Javascript Expansion](https://github.com/PlaceholderAPI/Javascript-Expansion). 

Just add a triple slash reference directive and automcomplete away!
```typescript
/// <reference types="./tfb/<version>/" />
```

## Versioning
Newer versions will build upon previous versions. Classes that have changed will have new "patched" files but classes that have not change will reference the last version that did change.

Currently working on initial version (Bukkit for minecraft 1.16.5)

# Doc Link
Every class, interface, enum, and package will have a link near the top of the file linking to the javadoc associated with it. This uses a hosted script that redirects to either the official spigot website or HelpChat in the form of:
  ```https://tfb.neocities.org/<version>/path/seperated/by/slashes```
  
  for example:
  
  ```https://tfb.neocities.org/1.16.5/org/bukkit/advancement/Advancement```
# Subclasses
Bukkit sometimes uses subclasses, especially for enums that are specfiic to a single class. Because I can't make a proper class as a property of the parent, instead I put it in the same file with the period synmbol replaced. You must run the subclass fix script at the same time as the typescript compiler in watch, which will replace periods in the output file.

### Example:

index.ts:

```typescript
namespace main {
  class Parent {

  }

  class Parent_$_Sub {

  }
}
```
index.js:
```javascript
class Parent {

}

class Parent.Sub {

}
```

