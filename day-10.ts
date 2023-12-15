type StreetSuffixTester<String extends string, Prefix extends string> = 
	String extends `${infer _}${Prefix}`
        ? true
        : false
