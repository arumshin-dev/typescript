/*타입스크립트의 클래스를 이용하여 Dict (딕셔너리. dictionary) 클래스를 만드세요. Dict 클래스는 아래와 같은 메소드들을 갖고 있어야 합니다.*/
type Words = {
  [key: string]: string;
}

class Dict {
  private words: Words //type
  constructor(){
    this.words = {}
  }
// add: 단어를 추가함.
  add(word: Word) { //class
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
// get: 단어의 정의를 리턴함.
  get(term: string) {
    return this.words[term];
  }
// delete: 단어를 삭제함.
  delete(term: string) {
    if (this.words[term] !== undefined) {
      delete this.words[term];
    }
  }
// update: 단어를 업데이트 함.
  update(word: Word) { //class
    if (this.words[word.term] !== undefined) {
      this.words[word.term] = word.def;
    }
  }
// showAll: 사전 단어를 모두 보여줌.
  showAll():void {
    for (const key in this.words) {
      console.log(key + ': ' + this.words[key]);
    }
  }
// count: 사전 단어들의 총 갯수를 리턴함.
  count(): number {
    return Object.keys(this.words).length;
  }
// upsert 단어를 업데이트 함. 존재하지 않을시. 이를 추가함. (update + insert = upsert)
  upsert(word: Word): void {
    this.words[word.term] = word.def;
  }
// exists: 해당 단어가 사전에 존재하는지 여부를 알려줌.
  exists(term: string): boolean {
    return term in this.words;
  }
// bulkAdd: 다음과 같은 방식으로. 여러개의 단어를 한번에 추가할 수 있게 해줌. [{term:"김치", definition:"대박이네~"}, {term:"아파트", definition:"비싸네~"}]
  bulkAdd(words: Word[]): void {
    words.forEach(word => {
      this.words[word.term] = word.def;
    });
  }
// bulkDelete: 다음과 같은 방식으로. 여러개의 단어를 한번에 삭제할 수 있게 해줌. ["김치", "아파트"]
  bulkDelete(terms: string[]): void {
    terms.forEach(term => {
      delete this.words[term];
    });
  }
}

class Word {
  constructor(
    public term: string, 
    public def: string
  ) {}
}

const kimchi = new Word("kimchi", "super cool food");
const pizza = new Word("pizza", "super nice piazza");
const dict = new Dict();

dict.add(kimchi);
dict.add(pizza);
console.log("KIMCHI:", dict.get("kimchi"));
console.log("PIZZA:", dict.get("pizza"));

dict.update(new Word("kimchi", "very incredible super food"));
console.log("UPDATE KIMCHI:", dict.get("kimchi"));
console.log("NOT UPDATE PIZZA:", dict.get("pizza"));
console.log("*");
dict.showAll();
dict.delete("pizza");
console.log("DELETE PIZZA", dict.get("pizza"));
console.log("NOT DELETE KIMCHI:", dict.get("kimchi"));
console.log("*");
dict.showAll();
console.log("**");
dict.bulkAdd([
  { term: "김치", def: "대박이네~" },
  { term: "아파트", def: "비싸네~" },
  { term: "사과", def: "빨갛고 맛있는 과일" }
]);

console.log("Dictionary contains:");
dict.showAll();
console.log("Count of words in dictionary:", dict.count());

// 단어 검색
console.log("def of 김치:", dict.get("김치"));

// 단어 수정
dict.upsert({ term: "김치", def: "한국의 전통 발효 음식" });
console.log("Updated 김치 def:", dict.get("김치"));

// 단어 삭제
dict.bulkDelete(["김치", "아파트"]);
console.log("After deletion:");
dict.showAll();