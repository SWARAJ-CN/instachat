import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/assets/styles/AuthScreen.styles";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { SvgXml } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

type Mode = "login" | "register";

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  const svgMarkup = `<svg width="48" height="43" viewBox="0 0 48 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.258 42.839c11.83 0 21.419-9.59 21.419-21.42S17.087 0 5.257 0c-11.829 0 .001 9.59.001 21.42 0 11.829-11.83 21.419 0 21.419" fill="#fff"/><path d="M42.742 42.839c-11.83 0-21.419-9.59-21.419-21.42S30.913 0 42.743 0c11.829 0-.001 9.59-.001 21.42 0 11.829 11.83 21.419 0 21.419" fill="#fff"/><circle cx="24" cy="21.421" r="5.355" fill="#000"/></svg>`;

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerifying(true);
    }, 1500);
  };

  const handleVerify = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerifying(true);
      router.replace("/(tabs)")
    }, 1500);
  };

  if (verifying) {
    return (
      <>
        <SafeAreaView style={styles.safe}>
          <KeyboardAvoidingView
            style={styles.kav}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
            >
              {/* logo */}
              <View style={styles.logoRow}>
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryContainer]}
                  style={styles.logoBox}
                >
                  <SvgXml xml={svgMarkup} width="50%" height="50%" />
                </LinearGradient>
                <Text style={styles.appName}>InstaChat</Text>
              </View>

              {/* hero  text */}

              <Text style={styles.heading}>Verify Email</Text>
              <Text style={styles.subheading}>
                We have send a 6-digit verification code to {email}
              </Text>

              {/* form */}

              <View style={styles.form}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Verification Code</Text>
                  <TextInput
                    style={styles.input}
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    placeholder="enter 6 digit code"
                    placeholderTextColor={Colors.outlineVariant}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                  />
                </View>
                {/* back to sign up link */}
                <View style={styles.toggleRow}>
                  <Text style={styles.toggleText}>
                    Did not receive a code ?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => setVerifying(false)}>
                    <Text style={styles.toggleLink}>Go back</Text>
                  </TouchableOpacity>
                </View>

                {/* submit */}

                <TouchableOpacity
                  onPress={handleVerify}
                  disabled={loading}
                  activeOpacity={0.88}
                  style={styles.btnWrapper}
                >
                  <LinearGradient
                    colors={[Colors.primary, Colors.primaryContainer]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.btn}
                  >
                    {loading ? (
                      <ActivityIndicator
                        color={Colors.onPrimary}
                        size="small"
                      />
                    ) : (
                      <>
                        <Text style={styles.btnText}>Verify Code</Text>
                        <Ionicons
                          name="arrow-forward"
                          size={18}
                          color={Colors.onPrimary}
                        />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* logo */}
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryContainer]}
              style={styles.logoBox}
            >
              <SvgXml xml={svgMarkup} width="50%" height="50%" />
            </LinearGradient>
            <Text style={styles.appName}>InstaChat</Text>
          </View>

          {/* hero  text */}

          <Text style={styles.heading}>
            {mode === "login" ? "Welcome back" : "create account"}
          </Text>
          <Text style={styles.subheading}>
            {mode === "login"
              ? "Sign in to continue chatting"
              : "Fill in your details to get started."}
          </Text>

          {/* form */}

          <View style={styles.form}>
            {mode === "register" && (
              <>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="your name"
                    placeholderTextColor={Colors.outlineVariant}
                    autoCapitalize="words"
                  />
                </View>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Username Handle</Text>
                  <View style={styles.handleRow}>
                    <Text style={styles.atSign}>@</Text>
                    <TextInput
                      style={[styles.handleInput]}
                      value={handle}
                      onChangeText={(v) =>
                        setHandle(v.toLocaleLowerCase().replace(/\s/g, ""))
                      }
                      placeholder="username"
                      placeholderTextColor={Colors.outlineVariant}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </>
            )}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@eample.com"
                placeholderTextColor={Colors.outlineVariant}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="•••••••"
                placeholderTextColor={Colors.outlineVariant}
                secureTextEntry
              />
            </View>
            {/* toggle mode */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {mode === "login"
                  ? "Don't have an account ?"
                  : "Already have an account "}
              </Text>
              <TouchableOpacity
                onPress={() => setMode(mode === "login" ? "register" : "login")}
              >
                <Text style={styles.toggleLink}>
                  {mode === "login" ? "Sign up" : "Sign in"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* submit */}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.88}
              style={styles.btnWrapper}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.btn}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.onPrimary} size="small" />
                ) : (
                  <>
                    <Text style={styles.btnText}>
                      {mode === "login" ? "Sign In" : "Create account"}
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={Colors.onPrimary}
                    />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
