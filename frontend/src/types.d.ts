interface StoredValue {
  address: string;
  name: string;
  description: string;
  type?: string;
}

interface Token {
  id: string;
  name: string;
  description: string;
  uri: string;
  isAvailable: boolean;
  mintedAt: string;
}
