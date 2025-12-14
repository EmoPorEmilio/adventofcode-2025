from python import Python

@fieldwise_init
struct Operation(Copyable, Movable):
  var numbers: List[Int]
  var numbers_from_right_to_left: List[Int]
  var operation: String

  fn get_result(self) -> Int:
    result = 0
    if self.operation == "*":
      result = 1;
      for i in range(len(self.numbers)):
        result *= self.numbers[i]
    else:
      for i in range(len(self.numbers)):
        result += self.numbers[i]
    return result

  fn get_result_right_to_left(self) -> Int:
    result = 0
    if (self.operation) == "*":
      result = 1;
    return result



def main():
  var builtins = Python.import_module("builtins");
  var f = builtins.open("input.txt", "r")
  var lines = f.readlines();
  f.close()
  var operations: List[Operation] = []
  for i in range(len(lines)):
    if i == 0:
      var parts = lines[i].split()
      for part in parts:
        operations.append(Operation([Int(part)], ""))
    elif i != (len(lines) - 1):
      var parts = lines[i].split()
      for j in range(len(parts)):
        operations[j].numbers.append(Int(parts[j]))
      
    else:
      operators = lines[i].strip().split()
      for j in range(len(operators)):
        operations[j].operation= String(operators[j])
  sum = 0
  for operation in operations:
    sum += operation.get_result()
  print("part1: ");
  print(sum);
  f.close()
