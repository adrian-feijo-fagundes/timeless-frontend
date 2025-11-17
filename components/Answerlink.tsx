import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type Props = { answer: string, linkText: string, href: string }

export default function AnswerLink({ answer, linkText, href }: Props) { 
    return (

        <View style={styles.rowSignup}>
            <Text style={styles.text}>{ answer}</Text>

            <Link href={href}>
                <Text style={styles.signup}>{" "}{ linkText }</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    rowSignup: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
    },
    signup: {
        color: "#fff",
        textDecorationStyle: "dotted",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});