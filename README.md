# Parse
A helper function for parsing the content of inline and external scripts

# Usage
## HTML
```
<script type="<TYPE>">
    // Script content
</script>
```
or
```
<script type="<TYPE>" src="<FILE>"></script>
```

## JS
```
parse("<TYPE>", function(text, script) {
    // Parse the text content of the script
});
````