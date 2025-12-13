from python import Python

def main():
  var builtins = Python.import_module("builtins");
  var f = builtins.open("input.txt", "r")
  var lines = f.readlines();
  f.close()
  for x in range(len(lines)):
    print(lines[x])
  f.close()
