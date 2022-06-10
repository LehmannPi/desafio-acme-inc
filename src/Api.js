import axios from "axios";

export const hipsum = axios.create({
	baseURL: "http://hipsum.co/api",
})

export const loremHipsum = async () => {
	return hipsum.get('/?type=hipster-latin&paras=10')
}
