#include <unordered_map>
#include <vector>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        std::unordered_map<int, int> hashmap;
        std::vector<int> result = {0, 1};
        for (int i { }; i < nums.size(); ++i) {
            if (hashmap.contains(target - nums[i])) {
                result = { hashmap[target - nums[i]], i };
                return result;
            }

            hashmap[nums[i]] = i;
        }

        return result;
    }
};

struct Testcase
{
    std::vector<int> nums { };
    int target { };
};

int main() {
    Solution solution;
    std::vector<Testcase> testcases = { 
        {{2, 7, 11, 15}, 9},
        {{3, 2, 4}, 6},
        {{3, 3}, 6}
    };
    
    for (Testcase t : testcases) {
        const std::vector<int> result = solution.twoSum(t.nums, t.target);
        std::cout << "[" << result[0] << ", " << result[1] << "]" << std::endl;
    }
}
